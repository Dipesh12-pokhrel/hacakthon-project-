import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const dbConnected = await connectDB();

// Import routes
import authRoutes from './routes/auth.js';
import hospitalRoutes from './routes/hospitals.js';
import hotelRoutes from './routes/hotels.js';
import appointmentRoutes from './routes/appointments.js';
import bookingRoutes from './routes/bookings.js';
import emergencyRoutes from './routes/emergency.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/emergency', emergencyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'MediStay Nepal AI Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🏥 Welcome to MediStay Nepal AI Backend',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      hospitals: '/api/hospitals',
      hotels: '/api/hotels',
      appointments: '/api/appointments',
      bookings: '/api/bookings',
      emergency: '/api/emergency',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     🏥 MediStay Nepal AI Backend Server Started 🚀         ║
║                                                            ║
║     Server running on: http://localhost:${PORT}                     ║
║     Environment: ${process.env.NODE_ENV || 'development'}                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;
