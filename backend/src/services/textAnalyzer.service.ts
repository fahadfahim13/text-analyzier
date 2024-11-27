import { TextAnalysis } from '../interfaces/text.interface';
import logger from '../config/logger';

export class TextAnalyzerService {
  public analyzeText(content: string): TextAnalysis {
    logger.info('Starting text analysis');
    
    const text = content.toLowerCase().trim();
    
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    const characterCount = text.replace(/\s/g, '').length;
    
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;
    
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    const paragraphCount = paragraphs.length;
    
    const uniqueWords = Array.from(new Set(words));
    const longestWords = uniqueWords
      .sort((a, b) => b.length - a.length)
      .slice(0, 5);
    
    logger.info('Text analysis completed');
    
    return {
      wordCount,
      characterCount,
      sentenceCount,
      paragraphCount,
      longestWords
    };
  }
}