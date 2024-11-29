import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

  if (req.body.userEmail && req.body.userEmail !== null && req.body.userEmail !== undefined && req.body.userEmail !== '') {
    return next();
  }
  if (req.params.userEmail && req.params.userEmail !== null && req.params.userEmail !== undefined && req.params.userEmail !== '') {
    return next();
  }

  if (req.query.userEmail && req.query.userEmail !== null && req.query.userEmail !== undefined && req.query.userEmail !== '') {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};
