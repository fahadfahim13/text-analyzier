// src/routes/text.routes.ts
import { Router } from 'express';
import { TextController } from '../controllers/text.controller';
import { isAuthenticated } from '../middleware/auth';

const router = Router();
const textController = new TextController();

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// Basic CRUD operations
router.post('/texts', textController.createText);
router.get('/texts', textController.getAllTexts);
router.get('/texts/:id', textController.getText);
router.put('/texts/:id', textController.updateText);
router.delete('/texts/:id', textController.deleteText);

// Analysis and search operations
router.get('/texts/:id/analysis', textController.getAnalysis);
router.get('/texts/search', textController.searchTexts);
router.get('/texts/stats', textController.getTextStatistics);

export default router;