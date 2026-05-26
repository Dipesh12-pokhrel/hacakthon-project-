import express from 'express';
import {
  getAllHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  approveHospital,
  searchHospitals,
} from '../controllers/hospitalController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllHospitals);
router.get('/search', searchHospitals);
router.get('/:id', getHospitalById);
router.post('/', protect, authorize('hospital_admin'), createHospital);
router.put('/:id', protect, authorize('hospital_admin', 'super_admin'), updateHospital);
router.patch('/:id/approve', protect, authorize('super_admin'), approveHospital);

export default router;
