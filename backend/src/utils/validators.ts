import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};