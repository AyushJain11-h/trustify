import express from 'express';
import { getProviders, getProviderById, createProviderProfile } from '../controllers/providerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProviders);
router.get('/:id', getProviderById);
router.post('/', protect, createProviderProfile);

export default router;
