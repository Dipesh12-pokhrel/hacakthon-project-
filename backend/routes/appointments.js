import express from 'express';
import {
  createAppointment,
  getUserAppointments,
  getHospitalAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, authorize('patient'), createAppointment);
router.get('/my-appointments', protect, authorize('patient'), getUserAppointments);
router.get('/hospital/:hospitalId', protect, authorize('hospital_admin'), getHospitalAppointments);
router.patch('/:id/status', protect, updateAppointmentStatus);
router.patch('/:id/cancel', protect, cancelAppointment);

export default router;
