# 🚀 MediStay Nepal AI - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js v14+, npm, MongoDB (local or cloud)

### Step 1: Backend Setup (2 minutes)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/medistay
# JWT_SECRET=your-secret-key
npm start
# Server running on http://localhost:5000 ✅
```

### Step 2: Frontend Setup (1 minute)
```bash
cd frontend
# Option A: Python
python -m http.server 3000

# Option B: npm (if installed)
npm install -g http-server
http-server -p 3000
```

### Step 3: Access Application (2 minutes)
```
Open browser → http://localhost:3000
Login with: patient@demo.com / demo123
```

---

## 🎯 Default Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Patient | patient@demo.com | demo123 |
| Hospital Admin | hospital@demo.com | demo123 |
| Hotel Admin | hotel@demo.com | demo123 |
| Emergency Admin | emergency@demo.com | demo123 |
| Super Admin | admin@demo.com | demo123 |

---

## 📁 Project Files Summary

```
MediStay Nepal AI/
│
├── backend/                    # Node.js + Express REST API
│   ├── models/                # MongoDB schemas (6 models)
│   ├── controllers/           # Business logic (6 controllers)
│   ├── routes/                # API endpoints (6 route files)
│   ├── middleware/            # JWT auth & authorization
│   ├── server.js              # Express app (main entry)
│   ├── package.json           # Dependencies
│   ├── .env.example           # Configuration template
│   └── README.md              # Backend docs
│
├── frontend/                  # HTML5 + CSS3 + Vanilla JS
│   ├── index.html             # Login & Register page
│   ├── user-dashboard.html    # Patient dashboard
│   ├── hospital-admin.html    # Hospital admin dashboard
│   ├── hotel-admin.html       # Hotel admin dashboard
│   ├── emergency-admin.html   # Emergency admin dashboard
│   ├── super-admin.html       # System admin dashboard
│   ├── css/
│   │   └── admin-dashboard.css # All styling (glassmorphism)
│   └── js/
│       ├── api-client.js      # HTTP client with token management
│       └── dashboard-utils.js # Shared utilities
│
├── README.md                  # Full documentation
└── QUICK_START.md            # This file
```

---

## 🏗️ System Architecture

### Three-Tier Architecture

```
┌─────────────────────┐
│   Frontend Layer    │  (HTML5, CSS3, Vanilla JS)
│  - 5 Dashboards    │
│  - Responsive UI   │
└─────────────────────┘
         ↕ (REST API / JSON)
┌─────────────────────┐
│   Backend Layer     │  (Node.js + Express)
│  - 6 Controllers   │
│  - 6 Route Files   │
│  - JWT Auth        │
└─────────────────────┘
         ↕ (Mongoose ODM)
┌─────────────────────┐
│  Database Layer     │  (MongoDB)
│  - 6 Collections   │
│  - Relationships   │
└─────────────────────┘
```

---

## 📊 Database Collections

1. **Users** - 5 roles (patient, hospital_admin, hotel_admin, emergency_admin, super_admin)
2. **Hospitals** - Healthcare facilities with doctors
3. **Hotels** - Recovery accommodations with rooms
4. **Appointments** - Doctor appointment bookings
5. **Bookings** - Room stay bookings
6. **Emergencies** - SOS requests with ambulance tracking

---

## 🎨 Features by Dashboard

### 🧑‍🦰 Patient Dashboard
- 🔍 Hospital search with filters
- 📅 Book doctor appointments
- 🏨 Hotel search & booking
- 🚑 One-click emergency SOS
- 📊 Booking history
- 💬 MediBot AI chat

### 🏥 Hospital Admin Dashboard
- 👨‍⚕️ Manage doctors
- 📅 Appointment management
- 🛏️ Bed occupancy tracking
- 📊 Analytics & reports
- ⚙️ Hospital settings

### 🏨 Hotel Admin Dashboard
- 🛎️ Room management
- 📋 Booking approvals
- 👥 Guest management
- 📊 Occupancy reports
- 💰 Revenue analytics

### 🚑 Emergency Admin Dashboard
- 🚨 Live SOS requests
- 🚗 Ambulance fleet management
- 📍 Real-time tracking
- 📊 Response metrics
- ⚙️ Emergency settings

### 👑 Super Admin Dashboard
- 👥 User management
- ✅ Hospital approvals
- ✅ Hotel approvals
- 📊 System analytics
- ⚙️ Platform settings

---

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ bcryptjs password hashing
- ✅ Role-based access control (RBAC)
- ✅ CORS enabled for trusted domains
- ✅ Input validation & sanitization
- ✅ XSS protection via escapeHtml()
- ✅ Environment variables for secrets

---

## 📱 Technology Stack Highlights

**Backend:**
- Express.js (web framework)
- Mongoose (database ORM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)

**Frontend:**
- HTML5 (semantic markup)
- CSS3 (glassmorphism, themes)
- ES6+ JavaScript (async/await)
- Vanilla (no external frameworks)

**Database:**
- MongoDB (NoSQL)
- Mongoose schemas (validation)
- TTL indexes (for cleanup)

---

## 🌐 Responsive Breakpoints

```
Mobile:     < 768px   (single column)
Tablet:     768px-1024px (2 columns)
Desktop:    > 1024px  (3+ columns)
```

---

## 🔧 Environment Configuration

### .env File Template

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medistay

# JWT
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Change JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (cloud) not local MongoDB
- [ ] Enable HTTPS (SSL/TLS certificate)
- [ ] Update CORS_ORIGIN to production domain
- [ ] Set up environment variables on hosting platform
- [ ] Configure backup strategy for database
- [ ] Enable database authentication & encryption
- [ ] Set up monitoring & error logging
- [ ] Implement rate limiting & DDoS protection
- [ ] Test all API endpoints
- [ ] Security audit & penetration testing
- [ ] Performance testing & optimization
- [ ] User acceptance testing (UAT)

---

## 🆘 Common Issues & Solutions

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
mongod  # Start MongoDB server

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/medistay
```

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Frontend Can't Connect to Backend
```javascript
// Check api-client.js URL
const api = new APIClient('http://localhost:5000');

// Verify CORS is enabled in backend
app.use(cors({ origin: 'http://localhost:3000' }));
```

### Token Expired
```javascript
// Tokens expire after 7 days
// User needs to login again
localStorage.clear();
window.location.href = 'index.html';
```

---

## 📈 Performance Optimization Tips

1. **Database Indexes** - Index frequently queried fields
2. **Caching** - Use Redis for session/data caching
3. **CDN** - Serve static files via CDN
4. **Minification** - Minify CSS/JS in production
5. **Lazy Loading** - Load images on demand
6. **Pagination** - Limit data in API responses
7. **Compression** - Enable gzip compression
8. **Monitoring** - Track API performance

---

## 📞 Support Resources

- **Bug Reports**: support@medistay.com
- **Technical Help**: dev@medistay.com
- **Feature Requests**: product@medistay.com
- **Documentation**: See README.md

---

## 🎓 Learning Path for Developers

### Week 1: Understanding Architecture
- [ ] Read full README.md
- [ ] Review database schema in /backend/models
- [ ] Study API routes in /backend/routes

### Week 2: Backend Development
- [ ] Understand JWT authentication
- [ ] Review controllers business logic
- [ ] Test API endpoints using Postman/Insomnia

### Week 3: Frontend Development
- [ ] Study dashboard-utils.js utilities
- [ ] Review api-client.js HTTP patterns
- [ ] Understand CSS glassmorphism styling

### Week 4: Full-Stack Integration
- [ ] Connect all dashboards to backend
- [ ] Implement error handling
- [ ] Test complete user flows

---

## 🎉 Success Criteria

Your setup is complete when:

✅ Backend running on http://localhost:5000  
✅ Frontend accessible on http://localhost:3000  
✅ Can login with demo credentials  
✅ Dashboard loads with user data  
✅ Hospital search works  
✅ Can book an appointment  
✅ Dark/light mode toggle works  

---

## 📊 Project Statistics

- **Backend Files**: 23 (models, controllers, routes, middleware)
- **Frontend Files**: 6 dashboards + utilities
- **Total Lines of Code**: ~8,000+
- **API Endpoints**: 25+
- **Database Collections**: 6
- **User Roles**: 5
- **Responsive Breakpoints**: 3

---

**Ready to launch MediStay Nepal AI? Let's go! 🚀**

For detailed information, see [README.md](./README.md)
