import express from 'express';
import {
  createBooking,
  getUserBookings,
  getHotelBookings,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, authorize('patient'), createBooking);
router.get('/my-bookings', protect, authorize('patient'), getUserBookings);
router.get('/hotel/:hotelId', protect, authorize('hotel_admin'), getHotelBookings);
router.patch('/:id/status', protect, updateBookingStatus);
router.patch('/:id/cancel', protect, cancelBooking);

export default router;
