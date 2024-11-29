// src/controllers/text.controller.ts
import { Request, Response } from 'express';
import Text from '../models/Text';
import { TextAnalyzerService } from '../services/textAnalyzer.service';
import logger from '../config/logger';
import mongoose from 'mongoose';

const textAnalyzerService = new TextAnalyzerService();

export class TextController {
  // Create new text
  public async createText(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, userEmail } = req.body;
    //   const userEmail = req.user?._id; // From auth middleware
      
      if (!content || !title) {
        res.status(400).json({ error: 'Title and content are required' });
        return;
      }

      if (!userEmail) {
        res.status(401).json({ error: 'User ID is required' });
        return;
      }

      const analysis = textAnalyzerService.analyzeText(content);
      
      const text = new Text({
        userEmail,
        title,
        content,
        analysis
      });

      await text.save();
      logger.info(`New text created with ID: ${text._id} for user: ${userEmail}`);
      
      res.status(201).json(text);
    } catch (error) {
      logger.error('Error creating text:', error);
      res.status(500).json({ error: 'Error creating text' });
    }
  }

  public async getText(req: Request, res: Response): Promise<void> {
    try {
      const { id, userEmail } = req.body;
    //   const userEmail = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid text ID' });
        return;
      }

      const text = await Text.findOne({ _id: id, userEmail });
      
      if (!text) {
        res.status(404).json({ error: 'Text not found' });
        return;
      }
      
      res.json(text);
    } catch (error) {
      logger.error('Error fetching text:', error);
      res.status(500).json({ error: 'Error fetching text' });
    }
  }

  // Get all texts for a user
  public async getAllTexts(req: Request, res: Response): Promise<void> {
    try {
    //   const userEmail = req.user?._id;
      const { userEmail } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = req.query.sortBy as string || 'createdAt';
      const order = req.query.order === 'asc' ? 1 : -1;

      const texts = await Text.find({ userEmail })
        .sort({ [sortBy]: order })
        .skip((page - 1) * limit)
        .limit(limit);

      logger.info(`Fetched ${texts.length} texts for user: ${userEmail}`);

      const total = await Text.countDocuments({ userEmail });
      
      res.json({
        texts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      logger.error('Error fetching texts:', error);
      res.status(500).json({ error: 'Error fetching texts' });
    }
  }

  // Update text
  public async updateText(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, content, userEmail } = req.body;
      
      if (!content) {
        res.status(400).json({ error: 'Content is required' });
        return;
      }

      const analysis = textAnalyzerService.analyzeText(content);
      
      const text = await Text.findOneAndUpdate(
        { _id: id, userEmail },
        { title, content, analysis },
        { new: true }
      );
      
      if (!text) {
        res.status(404).json({ error: 'Text not found' });
        return;
      }
      
      logger.info(`Text updated with ID: ${text._id} for user: ${userEmail}`);
      res.json(text);
    } catch (error) {
      logger.error('Error updating text:', error);
      res.status(500).json({ error: 'Error updating text' });
    }
  }

  // Delete text
  public async deleteText(req: Request, res: Response): Promise<void> {
    try {
      const { id, userEmail } = req.body;
    //   const userEmail = req.user?._id;

      const text = await Text.findOneAndDelete({ _id: id, userEmail });
      
      if (!text) {
        res.status(404).json({ error: 'Text not found' });
        return;
      }
      
      logger.info(`Text deleted with ID: ${text._id} for user: ${userEmail}`);
      res.json({ message: 'Text deleted successfully' });
    } catch (error) {
      logger.error('Error deleting text:', error);
      res.status(500).json({ error: 'Error deleting text' });
    }
  }

  // Get analysis only
  public async getAnalysis(req: Request, res: Response): Promise<void> {
    try {
      const { id, userEmail } = req.params;
    //   const userEmail = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid text ID' });
        return;
      }

      const text = await Text.findOne({ _id: id, userEmail });
      
      if (!text) {
        res.status(404).json({ error: 'Text not found' });
        return;
      }
      
      res.json(text.analysis);
    } catch (error) {
      logger.error('Error fetching analysis:', error);
      res.status(500).json({ error: 'Error fetching analysis' });
    }
  }

  // Search texts
  public async searchTexts(req: Request, res: Response): Promise<void> {
    try {
    //   const userEmail = req.user?._id;
      const { userEmail } = req.params;
      const query = req.query.q as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (!query) {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }

      const texts = await Text.find({
        userEmail,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ]
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Text.countDocuments({
        userEmail,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ]
      });

      res.json({
        texts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      logger.error('Error searching texts:', error);
      res.status(500).json({ error: 'Error searching texts' });
    }
  }

  // Get text statistics
  public async getTextStatistics(req: Request, res: Response): Promise<void> {
    try {
    //   const userEmail = req.user?._id;
      const { userEmail } = req.params;

      const stats = await Text.aggregate([
        { $match: { userEmail: userEmail } },
        {
          $group: {
            _id: null,
            totalTexts: { $sum: 1 },
            avgWordCount: { $avg: '$analysis.wordCount' },
            avgCharacterCount: { $avg: '$analysis.characterCount' },
            avgSentenceCount: { $avg: '$analysis.sentenceCount' },
            totalWords: { $sum: '$analysis.wordCount' }
          }
        }
      ]);

      if (stats.length === 0) {
        res.json({
          totalTexts: 0,
          avgWordCount: 0,
          avgCharacterCount: 0,
          avgSentenceCount: 0,
          totalWords: 0
        });
        return;
      }

      res.json(stats[0]);
    } catch (error) {
      logger.error('Error fetching text statistics:', error);
      res.status(500).json({ error: 'Error fetching text statistics' });
    }
  }
}