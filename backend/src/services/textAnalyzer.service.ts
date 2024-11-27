import { connectDatabase } from '../config/database';
import User from '../models/User';
import Text from '../models/Text';

export const initializeDatabase = async (): Promise<void> => {
  await connectDatabase();
  
  // Create indexes
  await Promise.all([
    User.createIndexes(),
    Text.createIndexes()
  ]);
};