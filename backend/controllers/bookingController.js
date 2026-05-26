import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { hotelId, roomType, checkInDate, checkOutDate, numberOfGuests, totalPrice, specialRequests, guestName, guestPhone } = req.body;

    const booking = await Booking.create({
      userId: req.user.id,
      hotelId,
      roomType,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
      specialRequests,
      guestName,
      guestPhone,
    });

    res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('hotelId', 'name location city')
      .sort({ checkInDate: -1 });

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ hotelId: req.params.hotelId })
      .populate('userId', 'name email phone');

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Booking updated', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Booking cancelled', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
