import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    emergencyType: {
      type: String,
      enum: ['accident', 'medical', 'ambulance', 'other'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    latitude: Number,
    longitude: Number,
    description: String,
    status: {
      type: String,
      enum: ['pending', 'dispatched', 'arrived', 'completed', 'cancelled'],
      default: 'pending',
    },
    assignedAmbulance: String,
    ambulanceETA: Number,
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'high',
    },
    contactPhone: String,
    nearestHospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Emergency', emergencySchema);
