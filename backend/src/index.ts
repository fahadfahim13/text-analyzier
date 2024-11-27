import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/requestLogger';
import logger, { logError } from './config/logger';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { configurePassport } from './config/passport';
import authRoutes from './routes/auth';
import session from 'express-session';
import textRoutes from './routes/api';
import { connectDatabase } from './config/database';


dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logError(err, 'Express error handler');
  res.status(500).json({ error: 'Internal Server Error' });
});


app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
configurePassport();

// Routes
app.use('/auth', authRoutes);
app.use('/api', textRoutes);

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

