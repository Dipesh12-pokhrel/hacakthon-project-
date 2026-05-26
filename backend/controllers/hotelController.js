import Hotel from '../models/Hotel.js';

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ isApproved: true }).populate('adminId', 'name email');
    res.status(200).json({ success: true, count: hotels.length, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('adminId', 'name email');
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    const { name, email, phone, location, city, address, rooms, amenities } = req.body;

    const hotel = await Hotel.create({
      name,
      email,
      phone,
      location,
      city,
      address,
      rooms: rooms || [],
      amenities: amenities || [],
      adminId: req.user.id,
    });

    res.status(201).json({ success: true, message: 'Hotel created successfully', data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    if (hotel.adminId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this hotel' });
    }

    hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Hotel updated successfully', data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Hotel approved', data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchHotels = async (req, res) => {
  try {
    const { city, priceMin, priceMax } = req.query;
    const query = { isApproved: true };

    if (city) query.city = { $regex: city, $options: 'i' };

    const hotels = await Hotel.find(query);
    res.status(200).json({ success: true, count: hotels.length, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
