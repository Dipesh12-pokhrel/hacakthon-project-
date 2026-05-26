import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hotel name is required'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rooms: [{
      type: String,
      available: Number,
      total: Number,
      price: Number,
    }],
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      default: 4.3,
      min: 0,
      max: 5,
    },
    amenities: [String],
    isApproved: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Hotel', hotelSchema);
