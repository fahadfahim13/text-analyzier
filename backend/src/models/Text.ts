import mongoose, { Schema, Model } from 'mongoose';
import { IText } from '../types/models';

const textSchema = new Schema<IText>({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  analysis: {
    wordCount: {
      type: Number,
      default: 0
    },
    characterCount: {
      type: Number,
      default: 0
    },
    sentenceCount: {
      type: Number,
      default: 0
    },
    paragraphCount: {
      type: Number,
      default: 0
    },
    longestWords: [{
      type: String
    }]
  }
}, {
  timestamps: true
});

// Indexes for better query performance
textSchema.index({ userId: 1, createdAt: -1 });
textSchema.index({ title: 'text', content: 'text' });

// Middleware to perform text analysis before saving
textSchema.pre('save', async function(next) {
  if (this.isModified('content')) {
    const content = this.content.toLowerCase();
    
    // Word count
    this.analysis.wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    
    // Character count (excluding spaces)
    this.analysis.characterCount = content.replace(/\s/g, '').length;
    
    // Sentence count
    this.analysis.sentenceCount = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    // Paragraph count
    this.analysis.paragraphCount = content.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    
    // Longest words
    const words = content.split(/\s+/).filter(word => word.length > 0);
    const sortedWords = [...new Set(words)].sort((a, b) => b.length - a.length);
    this.analysis.longestWords = sortedWords.slice(0, 5);
  }
  next();
});

const Text: Model<IText> = mongoose.model('Text', textSchema);
export default Text;
