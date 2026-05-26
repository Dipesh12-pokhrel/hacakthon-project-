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

// SEED HOSPITALS FOR DEMO
export const seedHospitals = async (req, res) => {
  try {
    await Hospital.deleteMany({});

    const sampleHospitals = [
      {
        name: 'Kathmandu Medical Center',
        email: 'contact@kmc.com.np',
        phone: '+977-1-4123456',
        location: 'Kathmandu, Nepal',
        city: 'Kathmandu',
        address: 'Durbar Marg, Kathmandu',
        latitude: 27.7172,
        longitude: 85.3240,
        bedsAvailable: 45,
        totalBeds: 100,
        rating: 4.8,
        isApproved: true,
        emergencyServices: true,
        specialties: ['Emergency', 'Surgery', 'Cardiology', 'Orthopedics'],
        doctors: [
          { name: 'Dr. Ram Kumar', specialty: 'Cardiology', phone: '+977-9800000001', available: true },
          { name: 'Dr. Sita Sharma', specialty: 'Surgery', phone: '+977-9800000002', available: true },
        ],
      },
      {
        name: 'Nepal Police Hospital',
        email: 'contact@nph.gov.np',
        phone: '+977-1-4200000',
        location: 'Kathmandu, Nepal',
        city: 'Kathmandu',
        address: 'Naxal, Kathmandu',
        latitude: 27.7200,
        longitude: 85.3150,
        bedsAvailable: 35,
        totalBeds: 80,
        rating: 4.5,
        isApproved: true,
        emergencyServices: true,
        specialties: ['Emergency', 'General Medicine', 'Orthopedics'],
        doctors: [
          { name: 'Dr. Anil Singh', specialty: 'Emergency', phone: '+977-9800000003', available: true },
        ],
      },
      {
        name: 'Tribhuvan University Teaching Hospital',
        email: 'contact@tuth.org.np',
        phone: '+977-1-4412303',
        location: 'Kathmandu, Nepal',
        city: 'Kathmandu',
        address: 'Maharajgunj, Kathmandu',
        latitude: 27.7100,
        longitude: 85.3300,
        bedsAvailable: 60,
        totalBeds: 150,
        rating: 4.6,
        isApproved: true,
        emergencyServices: true,
        specialties: ['Emergency', 'Surgery', 'Pediatrics', 'Gynecology', 'Cardiology'],
        doctors: [
          { name: 'Dr. Priya Patel', specialty: 'Pediatrics', phone: '+977-9800000004', available: true },
          { name: 'Dr. Rajesh Gupta', specialty: 'Cardiology', phone: '+977-9800000005', available: true },
        ],
      },
      {
        name: 'Apollo Specialty Hospital',
        email: 'contact@apollo.com.np',
        phone: '+977-1-4444444',
        location: 'Kathmandu, Nepal',
        city: 'Kathmandu',
        address: 'Lazimpat, Kathmandu',
        latitude: 27.7250,
        longitude: 85.3200,
        bedsAvailable: 40,
        totalBeds: 120,
        rating: 4.7,
        isApproved: true,
        emergencyServices: true,
        specialties: ['Emergency', 'Cardiac Surgery', 'Neurology', 'Oncology'],
        doctors: [
          { name: 'Dr. Deepak Verma', specialty: 'Cardiac Surgery', phone: '+977-9800000006', available: true },
        ],
      },
      {
        name: 'Patan Academy of Health Sciences',
        email: 'contact@pahs.edu.np',
        phone: '+977-1-5555555',
        location: 'Lalitpur, Nepal',
        city: 'Lalitpur',
        address: 'Lagankhel, Lalitpur',
        latitude: 27.6825,
        longitude: 85.3180,
        bedsAvailable: 50,
        totalBeds: 110,
        rating: 4.4,
        isApproved: true,
        emergencyServices: true,
        specialties: ['Emergency', 'General Medicine', 'Surgery', 'OB-GYN'],
        doctors: [
          { name: 'Dr. Maya Sharma', specialty: 'OB-GYN', phone: '+977-9800000007', available: true },
        ],
      },
    ];

    const hospitals = await Hospital.insertMany(sampleHospitals);
    res.status(201).json({
      success: true,
      message: `Seeded ${hospitals.length} hospitals successfully`,
      data: hospitals,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
