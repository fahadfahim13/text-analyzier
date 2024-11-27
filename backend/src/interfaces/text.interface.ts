export interface TextAnalysis {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  longestWords: string[];
}
  
export interface TextDocument {
  _id?: string;
  title: string;
  content: string;
  analysis: TextAnalysis;
  createdAt: Date;
  updatedAt: Date;
}
