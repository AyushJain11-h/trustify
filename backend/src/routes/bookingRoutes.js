import express from 'express';
import { createBooking, getBookingById, updateBookingStatus } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, updateBookingStatus);

export default router;
