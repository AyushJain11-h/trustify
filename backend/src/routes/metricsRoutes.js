import express from 'express';
import { getAdminAnalytics } from '../controllers/metricsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Usually this would have an admin protect middleware
router.get('/admin', getAdminAnalytics);

export default router;
