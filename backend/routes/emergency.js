import express from 'express';
import {
  createEmergency,
  getUserEmergencies,
  getAllEmergencies,
  assignAmbulance,
  updateEmergencyStatus,
} from '../controllers/emergencyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, authorize('patient'), createEmergency);
router.get('/my-emergencies', protect, authorize('patient'), getUserEmergencies);
router.get('/', protect, authorize('emergency_admin', 'super_admin'), getAllEmergencies);
router.patch('/:id/assign-ambulance', protect, authorize('emergency_admin', 'super_admin'), assignAmbulance);
router.patch('/:id/status', protect, authorize('emergency_admin', 'super_admin'), updateEmergencyStatus);

export default router;
