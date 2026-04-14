import express from 'express';
import { chatWithAI, getPriceEstimate, getProviderRecommendation } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/chat', chatWithAI); // Can be public or protected
router.post('/price-check', getPriceEstimate);
router.post('/recommend', getProviderRecommendation);

export default router;
