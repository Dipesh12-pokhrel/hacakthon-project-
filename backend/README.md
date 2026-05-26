# MediStay Nepal AI - Full-Stack Backend

## 📦 Installation

\`\`\`bash
cd backend
npm install
\`\`\`

## ⚙️ Configuration

Create a \`.env\` file based on \`.env.example\`:

\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medistay-nepal-ai
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
\`\`\`

## 🚀 Running the Server

**Development mode with auto-reload:**
\`\`\`bash
npm run dev
\`\`\`

**Production mode:**
\`\`\`bash
npm start
\`\`\`

## 🔗 API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/me\` - Get current user (requires token)

### Hospitals
- \`GET /api/hospitals\` - Get all approved hospitals
- \`GET /api/hospitals/search\` - Search hospitals
- \`GET /api/hospitals/:id\` - Get hospital by ID
- \`POST /api/hospitals\` - Create hospital (hospital_admin)
- \`PUT /api/hospitals/:id\` - Update hospital (hospital_admin/super_admin)
- \`PATCH /api/hospitals/:id/approve\` - Approve hospital (super_admin)

### Hotels
- \`GET /api/hotels\` - Get all approved hotels
- \`GET /api/hotels/search\` - Search hotels
- \`GET /api/hotels/:id\` - Get hotel by ID
- \`POST /api/hotels\` - Create hotel (hotel_admin)
- \`PUT /api/hotels/:id\` - Update hotel (hotel_admin/super_admin)
- \`PATCH /api/hotels/:id/approve\` - Approve hotel (super_admin)

### Appointments
- \`POST /api/appointments\` - Create appointment (patient)
- \`GET /api/appointments/my-appointments\` - Get user's appointments (patient)
- \`GET /api/appointments/hospital/:hospitalId\` - Get hospital appointments (hospital_admin)
- \`PATCH /api/appointments/:id/status\` - Update appointment status
- \`PATCH /api/appointments/:id/cancel\` - Cancel appointment

### Bookings
- \`POST /api/bookings\` - Create booking (patient)
- \`GET /api/bookings/my-bookings\` - Get user's bookings (patient)
- \`GET /api/bookings/hotel/:hotelId\` - Get hotel bookings (hotel_admin)
- \`PATCH /api/bookings/:id/status\` - Update booking status
- \`PATCH /api/bookings/:id/cancel\` - Cancel booking

### Emergency
- \`POST /api/emergency\` - Create emergency alert (patient)
- \`GET /api/emergency/my-emergencies\` - Get user's emergencies (patient)
- \`GET /api/emergency\` - Get all emergencies (emergency_admin/super_admin)
- \`PATCH /api/emergency/:id/assign-ambulance\` - Assign ambulance
- \`PATCH /api/emergency/:id/status\` - Update emergency status

## 🔐 User Roles

- **patient** - Can book appointments, hotels, create emergencies
- **hospital_admin** - Can manage hospital, view appointments
- **hotel_admin** - Can manage hotel, view bookings
- **emergency_admin** - Can manage emergency responses
- **super_admin** - Full system access, can approve hospitals/hotels

## 📋 Authentication

Include JWT token in Authorization header:

\`\`\`
Authorization: Bearer <your_token_here>
\`\`\`

## 🗄️ Database Models

### User
- name, email, password, phone, role, address, profileImage, isActive, isApproved

### Hospital
- name, email, phone, location, city, address, bedsAvailable, specialties, doctors, rating, isApproved

### Hotel
- name, email, phone, location, city, address, rooms, amenities, rating, isApproved

### Appointment
- userId, hospitalId, doctorName, specialty, appointmentDate, timeSlot, reason, status

### Booking
- userId, hotelId, roomType, checkInDate, checkOutDate, numberOfGuests, totalPrice, status

### Emergency
- userId, emergencyType, location, description, status, assignedAmbulance, priority

---

**Built for MediStay Nepal AI - Smart Healthcare Platform**
