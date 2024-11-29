import mongoose from "mongoose";

export interface IUser {
    email: string;
    password?: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
export interface IText {
  // userId: mongoose.Types.ObjectId;
  userEmail: string;
  content: string;
  title: string;
  analysis: {
      wordCount: number;
      characterCount: number;
      sentenceCount: number;
      paragraphCount: number;
      longestWords: string[];
    };
    createdAt: Date;
    updatedAt: Date;
  }