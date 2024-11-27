import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import logger from './logger';

export const configurePassport = () => {
  // Serialize user for the session
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id: string, done: any) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Configure Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/auth/google/callback',
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists
          let user = await User.findOne({ email: profile.emails![0].value });

          if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
              email: profile.emails![0].value,
              name: profile.displayName,
              googleId: profile.id,
              avatar: profile.photos?.[0].value
            });
            logger.info(`New user created via Google SSO: ${user.email}`);
          }

          return done(null, user);
        } catch (error) {
          logger.error('Error in Google authentication:', error);
          return done(error as Error, undefined);
        }
      }
    )
  );
};