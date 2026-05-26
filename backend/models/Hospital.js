import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hospital name is required'],
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
    bedsAvailable: {
      type: Number,
      default: 50,
    },
    totalBeds: {
      type: Number,
      default: 100,
    },
    specialties: [String],
    doctors: [{
      name: String,
      specialty: String,
      phone: String,
      available: Boolean,
    }],
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
    latitude: {
      type: Number,
      default: 27.7172,
    },
    longitude: {
      type: Number,
      default: 85.3240,
    },
    emergencyServices: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Hospital', hospitalSchema);
