import express from 'express';
import passport from 'passport';
import logger from '../config/logger';
import { isAuthenticated } from '../middleware/auth';
import { generateToken } from '../utils/validators';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      const token = generateToken(req.user);
      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${token}`);
    }
  );

// Logout route
router.get('/logout', (req, res) => {
    req.logout(() => {
      res.json({ message: 'Logged out successfully' });
    });
  });
  
// Get current user
router.get('/user', isAuthenticated, (req, res) => {
  res.json(req.user);
});

export default router;