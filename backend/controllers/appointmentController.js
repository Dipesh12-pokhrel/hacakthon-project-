import Appointment from '../models/Appointment.js';

export const createAppointment = async (req, res) => {
  try {
    const { hospitalId, doctorName, specialty, appointmentDate, timeSlot, reason } = req.body;

    const appointment = await Appointment.create({
      userId: req.user.id,
      hospitalId,
      doctorName,
      specialty,
      appointmentDate,
      timeSlot,
      reason,
    });

    res.status(201).json({ success: true, message: 'Appointment created successfully', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate('hospitalId', 'name location')
      .sort({ appointmentDate: 1 });

    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHospitalAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ hospitalId: req.params.hospitalId })
      .populate('userId', 'name email phone');

    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Appointment updated', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Appointment cancelled', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
