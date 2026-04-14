import express from 'express';
import { getProviderReviewInsights } from '../controllers/insightController.js';

const router = express.Router();

router.get('/reviews/:providerId', getProviderReviewInsights);

export default router;
