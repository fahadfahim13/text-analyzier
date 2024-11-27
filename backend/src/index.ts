import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/requestLogger';
import { logError } from './config/logger';
import { initializeDatabase } from './services/textAnalyzer.service';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { configurePassport } from './config/passport';
import authRoutes from './routes/auth';
import session from 'express-session';


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

const startServer = async () => {
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

