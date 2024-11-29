import { Router } from 'express';
import { TextController } from '../controllers/text.controller';
import { isAuthenticated } from '../middleware/auth';

const router = Router();
const textController = new TextController();

router.use(isAuthenticated);

router.post('/texts', textController.createText);
router.get('/texts', textController.getAllTexts);
router.post('/texts/get-details', textController.getText);
router.put('/texts', textController.updateText);
router.delete('/texts', textController.deleteText);

router.get('/texts/:id/analysis', textController.getAnalysis);
router.get('/texts/search', textController.searchTexts);
router.get('/texts/stats', textController.getTextStatistics);

export default router;