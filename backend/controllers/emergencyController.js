import Emergency from '../models/Emergency.js';

export const createEmergency = async (req, res) => {
  try {
    const { emergencyType, location, latitude, longitude, description, contactPhone } = req.body;

    const emergency = await Emergency.create({
      userId: req.user.id,
      emergencyType,
      location,
      latitude,
      longitude,
      description,
      contactPhone,
      status: 'pending',
    });

    res.status(201).json({ success: true, message: 'Emergency alert sent', data: emergency });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({ userId: req.user.id })
      .populate('nearestHospital', 'name location')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: emergencies.length, data: emergencies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate('userId', 'name phone')
      .populate('nearestHospital', 'name location')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: emergencies.length, data: emergencies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const assignAmbulance = async (req, res) => {
  try {
    const { ambulanceId, eta } = req.body;

    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      {
        status: 'dispatched',
        assignedAmbulance: ambulanceId,
        ambulanceETA: eta,
        assignedBy: req.user.id,
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Ambulance assigned', data: emergency });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEmergencyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Emergency updated', data: emergency });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
