import express from 'express';
import {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  approveHotel,
  searchHotels,
} from '../controllers/hotelController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllHotels);
router.get('/search', searchHotels);
router.get('/:id', getHotelById);
router.post('/', protect, authorize('hotel_admin'), createHotel);
router.put('/:id', protect, authorize('hotel_admin', 'super_admin'), updateHotel);
router.patch('/:id/approve', protect, authorize('super_admin'), approveHotel);

export default router;
