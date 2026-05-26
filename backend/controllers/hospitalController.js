import Hospital from '../models/Hospital.js';

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({ isApproved: true }).populate('adminId', 'name email');
    res.status(200).json({ success: true, count: hospitals.length, data: hospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate('adminId', 'name email');
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createHospital = async (req, res) => {
  try {
    const { name, email, phone, location, city, address, bedsAvailable, specialties, doctors } = req.body;

    const hospital = await Hospital.create({
      name,
      email,
      phone,
      location,
      city,
      address,
      bedsAvailable: bedsAvailable || 50,
      specialties: specialties || [],
      doctors: doctors || [],
      adminId: req.user.id,
    });

    res.status(201).json({ success: true, message: 'Hospital created successfully', data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHospital = async (req, res) => {
  try {
    let hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    // Check if user is admin of this hospital
    if (hospital.adminId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this hospital' });
    }

    hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Hospital updated successfully', data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Hospital approved', data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchHospitals = async (req, res) => {
  try {
    const { city, specialty } = req.query;
    const query = { isApproved: true };

    if (city) query.city = { $regex: city, $options: 'i' };
    if (specialty) query.specialties = specialty;

    const hospitals = await Hospital.find(query);
    res.status(200).json({ success: true, count: hospitals.length, data: hospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
