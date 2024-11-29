import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/models';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
    default: ''
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});


const User: Model<IUser> = mongoose.model('User', userSchema);
export default User;