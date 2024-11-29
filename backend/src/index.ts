import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { requestLogger } from './middleware/requestLogger';
import logger, { logError } from './config/logger';
// import passport from 'passport';
// import MongoStore from 'connect-mongo';
// import { configurePassport } from './config/passport';
import authRoutes from './routes/auth';
import textRoutes from './routes/api';
import { connectDatabase } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CORS configuration
app.use(cors());
app.use(express.json());
// app.use(requestLogger);



// Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Configure passport
// configurePassport();

// Routes
app.use('/auth', authRoutes);
app.use('/api', textRoutes);

// Error handling middleware should be after routes
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logError(err, 'Express error handler');
  res.status(500).json({ error: 'Internal Server Error' });
});

const startServer = async () => {
  try {
    await connectDatabase();
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

app.listen(port, async () => {
  logger.info(`Server connecting to MongoDB on port ${port}`);
  await startServer();
  logger.info(`Server running on port ${port}`);
});

export default app;