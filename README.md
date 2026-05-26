# 🏥 MediStay Nepal AI - Full Stack Application

**Smart Healthcare + Hospitality + Emergency Response Platform**

A production-ready startup system prototype combining healthcare booking, recovery accommodation, and emergency ambulance services into one integrated platform.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Installation & Setup](#installation--setup)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [User Roles & Features](#user-roles--features)
8. [Project Structure](#project-structure)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)

---

## 📱 Project Overview

MediStay Nepal AI is an integrated platform solving three critical healthcare gaps:

### Core Modules

1. **Healthcare Module** 🏥
   - Doctor appointment booking system
   - Hospital inventory & availability management
   - Specialist search and filtering

2. **Hospitality Module** 🏨
   - Recovery stay room booking
   - Occupancy tracking
   - Guest management

3. **Emergency Module** 🚑
   - One-click SOS emergency requests
   - Real-time ambulance dispatch
   - Location-based emergency response

### Target Users

- **Patients**: Book appointments and recovery stays
- **Hospital Admins**: Manage doctors, appointments, bed inventory
- **Hotel Admins**: Manage rooms, bookings, occupancy
- **Emergency Admins**: Manage SOS requests and ambulance fleet
- **Super Admin**: System oversight, approvals, analytics

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **CORS**: Enabled for frontend integration

### Frontend
- **Markup**: HTML5
- **Styling**: CSS3 with Glassmorphism + Dark/Light Mode
- **Scripting**: Vanilla JavaScript (ES6+)
- **API Client**: Custom async/await HTTP client
- **Responsive**: Mobile-first design (mobile, tablet, desktop)

### DevOps
- **Version Control**: Git
- **Package Manager**: npm
- **Environment Management**: dotenv

---

## 🏗️ System Architecture

### Backend Directory Structure
```
backend/
├── models/              # Database schemas
│   ├── User.js         # User authentication & profiles
│   ├── Hospital.js     # Hospital data
│   ├── Hotel.js        # Hotel/hostel data
│   ├── Appointment.js  # Appointment bookings
│   ├── Booking.js      # Room bookings
│   └── Emergency.js    # Emergency requests
├── routes/             # API route handlers
│   ├── auth.js         # Authentication endpoints
│   ├── hospitals.js    # Hospital management
│   ├── hotels.js       # Hotel management
│   ├── appointments.js # Appointment operations
│   ├── bookings.js     # Room booking operations
│   └── emergency.js    # Emergency operations
├── controllers/        # Business logic
│   ├── authController.js
│   ├── hospitalController.js
│   ├── hotelController.js
│   ├── appointmentController.js
│   ├── bookingController.js
│   └── emergencyController.js
├── middleware/         # Express middleware
│   └── auth.js        # JWT verification & role authorization
├── server.js          # Main Express app
├── package.json       # Dependencies
├── .env.example       # Environment template
└── README.md          # Backend documentation
```

### Frontend Directory Structure
```
frontend/
├── index.html              # Login & Registration page
├── user-dashboard.html     # Patient interface
├── hospital-admin.html     # Hospital admin panel
├── hotel-admin.html        # Hotel admin panel
├── emergency-admin.html    # Emergency admin panel
├── super-admin.html        # System admin dashboard
├── css/
│   └── admin-dashboard.css # All styling (glassmorphism, themes)
└── js/
    ├── api-client.js       # HTTP client with token management
    └── dashboard-utils.js  # Shared utility functions
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MongoDB**: Local or cloud instance (MongoDB Atlas)
- **Git**: For version control

### Step 1: Clone the Repository

```bash
cd e:\bussiness pitch
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env with your configuration
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/medistay
# - JWT_SECRET=your-secret-key
```

### Step 3: Frontend Setup

No installation needed! The frontend uses vanilla JavaScript and runs directly in the browser.

```bash
cd ../frontend
# Serve files via local web server (see "Running the Application")
```

---

## ▶️ Running the Application

### Option 1: Development Mode

**Terminal 1 - Start Backend Server**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend (any HTTP server)**

Using Python 3:
```bash
cd frontend
python -m http.server 3000
# Access at http://localhost:3000
```

Using Node.js http-server:
```bash
npm install -g http-server
cd frontend
http-server -p 3000
```

### Option 2: Using Docker

```bash
# Build and run with Docker Compose (requires Docker installation)
docker-compose up

# Access frontend: http://localhost:3000
# Access backend: http://localhost:5000
```

### Demo Credentials

```
Patient Account:
Email: patient@demo.com
Password: demo123

Hospital Admin:
Email: hospital@demo.com
Password: demo123

Hotel Admin:
Email: hotel@demo.com
Password: demo123

Emergency Admin:
Email: emergency@demo.com
Password: demo123

Super Admin:
Email: admin@demo.com
Password: demo123
```

---

## 📡 API Documentation

### Authentication Endpoints

**POST /api/auth/register**
- Register new user
- Body: `{name, email, password, role}`
- Returns: `{token, user}`

**POST /api/auth/login**
- User login
- Body: `{email, password}`
- Returns: `{token, user}`

**GET /api/auth/me** *(Protected)*
- Get current user profile
- Returns: `{user}`

### Hospital Management

**GET /api/hospitals**
- List all approved hospitals
- Query: `?city=Kathmandu&specialty=Cardiology`

**GET /api/hospitals/:id**
- Get hospital details

**POST /api/hospitals** *(Hospital Admin)*
- Create new hospital
- Body: `{name, location, email, phone, specialty[]}`

**PUT /api/hospitals/:id** *(Hospital Admin)*
- Update hospital details

**POST /api/hospitals/:id/approve** *(Super Admin)*
- Approve hospital registration

### Hotel Management

**GET /api/hotels**
- List all approved hotels
- Query: `?city=Kathmandu&price_max=100`

**GET /api/hotels/:id**
- Get hotel details with rooms

**POST /api/hotels** *(Hotel Admin)*
- Create new hotel
- Body: `{name, location, email, phone, rooms[]}`

**PUT /api/hotels/:id** *(Hotel Admin)*
- Update hotel details & room info

**POST /api/hotels/:id/approve** *(Super Admin)*
- Approve hotel registration

### Appointment Management

**POST /api/appointments** *(Patient)*
- Book appointment
- Body: `{hospitalId, doctorName, specialty, appointmentDate, appointmentTime}`

**GET /api/appointments** *(Patient)*
- Get user's appointments

**GET /api/appointments/hospital/:id** *(Hospital Admin)*
- Get all appointments for hospital

**PUT /api/appointments/:id** *(Hospital/Patient)*
- Update appointment status

**DELETE /api/appointments/:id** *(Patient)*
- Cancel appointment

### Room Booking Management

**POST /api/bookings** *(Patient)*
- Book room
- Body: `{hotelId, roomType, checkInDate, checkOutDate, numberOfGuests}`

**GET /api/bookings** *(Patient)*
- Get user's bookings

**GET /api/bookings/hotel/:id** *(Hotel Admin)*
- Get all bookings for hotel

**PUT /api/bookings/:id** *(Hotel/Patient)*
- Update booking status

**DELETE /api/bookings/:id** *(Patient)*
- Cancel booking

### Emergency Services

**POST /api/emergency** *(Patient - No auth required)*
- Create emergency SOS request
- Body: `{emergencyType, location, latitude, longitude, description, contactNumber}`

**GET /api/emergency** *(Patient)*
- Get user's emergency requests

**GET /api/emergency/admin** *(Emergency Admin)*
- Get all emergency requests

**POST /api/emergency/:id/assign** *(Emergency Admin)*
- Assign ambulance to emergency

**PUT /api/emergency/:id** *(Emergency Admin)*
- Update emergency status

---

## 👥 User Roles & Features

### 1. Patient Role 👤

**Features:**
- ✅ Search hospitals by location, specialty, availability
- ✅ View doctor profiles and availability
- ✅ Book doctor appointments with confirmation
- ✅ Search hotels for recovery stays
- ✅ Book rooms with date selection
- ✅ View booking history
- ✅ One-click emergency SOS button
- ✅ Track emergency requests in real-time
- ✅ MediBot AI chat for medical advice
- ✅ Manage profile and preferences
- ✅ Dark/Light mode theme

**Access:** `http://localhost:3000/user-dashboard.html`

### 2. Hospital Admin Role 🏥

**Features:**
- ✅ Manage hospital profile and information
- ✅ Add/edit/delete doctors and specialists
- ✅ Track bed availability and occupancy
- ✅ View all incoming appointments
- ✅ Accept/reject appointment requests
- ✅ Send notifications to patients
- ✅ View appointment analytics
- ✅ Manage hospital specialties
- ✅ Hospital performance reports

**Access:** `http://localhost:3000/hospital-admin.html`

### 3. Hotel Admin Role 🏨

**Features:**
- ✅ Manage hotel profile and details
- ✅ Add/edit/delete room types and pricing
- ✅ Track room availability and occupancy rate
- ✅ View all room booking requests
- ✅ Accept/reject booking requests
- ✅ Manage guest check-in/check-out
- ✅ View occupancy analytics
- ✅ Pricing management
- ✅ Guest communication

**Access:** `http://localhost:3000/hotel-admin.html`

### 4. Emergency Admin Role 🚑

**Features:**
- ✅ Real-time dashboard for SOS requests
- ✅ View active emergency calls with location
- ✅ Ambulance fleet management
- ✅ Dispatch ambulances to emergencies
- ✅ Track ambulance location and ETA
- ✅ Update emergency status (pending → dispatched → completed)
- ✅ Emergency response analytics
- ✅ Call history and completion rate

**Access:** `http://localhost:3000/emergency-admin.html`

### 5. Super Admin Role 👑

**Features:**
- ✅ System-wide analytics dashboard
- ✅ View all users by role
- ✅ Approve/reject hospital registrations
- ✅ Approve/reject hotel registrations
- ✅ User account management
- ✅ System statistics and reports
- ✅ Platform configuration settings
- ✅ Server status monitoring
- ✅ Generate system reports

**Access:** `http://localhost:3000/super-admin.html`

---

## 📁 Project Structure

### Key Files Summary

| File | Purpose |
|------|---------|
| `backend/server.js` | Express.js main application |
| `backend/models/*.js` | Database schema definitions (Mongoose) |
| `backend/controllers/*.js` | Business logic for each module |
| `backend/routes/*.js` | API endpoint definitions |
| `backend/middleware/auth.js` | JWT authentication & authorization |
| `frontend/index.html` | Login & registration page |
| `frontend/*-dashboard.html` | Role-specific dashboards (5 total) |
| `frontend/css/admin-dashboard.css` | All styling (2000+ lines) |
| `frontend/js/api-client.js` | HTTP client with token management |
| `frontend/js/dashboard-utils.js` | Shared utility functions |

### Database Models

1. **User** - Accounts with roles, authentication
2. **Hospital** - Facility data with doctors, beds
3. **Hotel** - Accommodation with room types
4. **Appointment** - Doctor appointment bookings
5. **Booking** - Room stay bookings
6. **Emergency** - SOS requests with ambulance data

---

## 📦 Deployment Guide

### Local Deployment

1. **Start MongoDB** (if local)
   ```bash
   # Windows
   mongod

   # macOS/Linux
   brew services start mongodb-community
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   http-server -p 3000
   ```

### Cloud Deployment (AWS/Heroku/DigitalOcean)

#### Environment Variables (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/medistay
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

#### Backend Deployment (Heroku Example)
```bash
cd backend

# Create Heroku app
heroku create medistay-backend

# Set environment variables
heroku config:set MONGODB_URI=your-mongodb-url
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main

# Backend URL: https://medistay-backend.herokuapp.com
```

#### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend

# Update api-client.js with production backend URL
# Then deploy to Netlify or Vercel

# API_URL = https://medistay-backend.herokuapp.com
```

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
```bash
# 1. Ensure MongoDB is running
mongod

# 2. Check .env MONGODB_URI format
# Local: mongodb://localhost:27017/medistay
# Cloud: mongodb+srv://user:pass@cluster.mongodb.net/medistay

# 3. Verify connection string in backend logs
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Errors in Frontend

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
```javascript
// backend/server.js - Ensure CORS is configured
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

### JWT Token Expiration

**Error:** `Token expired` or `Invalid token`

**Solution:**
```javascript
// Frontend automatically refreshes on re-login
// Clear localStorage and login again
localStorage.clear();
window.location.href = 'index.html';
```

### API Requests Returning 401 Unauthorized

**Error:** `401 Unauthorized - Authentication required`

**Solution:**
1. Check token is saved in localStorage
2. Verify JWT_SECRET matches backend
3. Ensure token is included in headers:
   ```javascript
   const token = api.getToken();
   if (!token) {
       window.location.href = 'index.html';
   }
   ```

---

## 📚 Additional Resources

### Documentation Files
- [Backend README](./backend/README.md) - Detailed backend setup
- [API Documentation](./backend/README.md#api-endpoints) - Complete API reference
- [Database Schema](./backend/models/) - MongoDB schema documentation

### Learning Resources
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Tutorial](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🎯 Future Enhancements

### Phase 2 Features
- [ ] Real-time notifications (Socket.io)
- [ ] Payment integration (Stripe/Khalti)
- [ ] Patient medical records (PDF export)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] SMS/Email notifications
- [ ] Video consultation bookings
- [ ] Insurance integration

### Phase 3 Features
- [ ] Mobile app (React Native/Flutter)
- [ ] AI-powered diagnostics
- [ ] Telemedicine integration
- [ ] Prescription management
- [ ] Lab test booking
- [ ] Health records blockchain

---

## 📝 License

**Proprietary - MediStay Nepal AI**

This project is proprietary software. Unauthorized use is prohibited.

For licensing inquiries, contact: admin@medistay.com

---

## 🤝 Support & Contribution

### Bug Reports
Submit issues via email: support@medistay.com

### Feature Requests
Contact: product@medistay.com

### Technical Support
- **Documentation**: `/backend/README.md`
- **Email**: dev@medistay.com
- **Response Time**: 24 hours

---

## 👨‍💻 Development Team

**MediStay Nepal AI** - Building the future of healthcare in Nepal 🇳🇵

---

## ⚠️ Important Notes

### Security Considerations

1. **Environment Variables**
   - Never commit `.env` file to git
   - Change JWT_SECRET in production
   - Use environment-specific configurations

2. **Data Protection**
   - All passwords hashed with bcryptjs
   - JWT tokens for stateless authentication
   - CORS enabled only for trusted domains

3. **Database**
   - Use MongoDB Atlas for production
   - Enable authentication in MongoDB
   - Regular backups recommended

### Performance Tips

- Use CDN for static assets
- Implement caching (Redis)
- Optimize database indexes
- Monitor API response times
- Load testing before production

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
