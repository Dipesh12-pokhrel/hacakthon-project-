# 🏥 MediStay Nepal AI - Demo Credentials & Login Guide

## ✅ System Status
- **Backend Server:** http://localhost:5000 ✅
- **Frontend Server:** http://localhost:3000 ✅
- **Database:** MongoDB Connected ✅

---

## 📋 Pre-Created Demo Accounts

All demo accounts use password: **`demo123`**

### 1️⃣ Super Admin Account
**Role:** System Administrator with full access
- **Email:** `superadmin@demo.com`
- **Password:** `demo123`
- **Dashboard:** Super Admin Dashboard
- **Access:** User approvals, platform settings, system analytics

### 2️⃣ Hospital Admin Account
**Role:** Hospital Management
- **Email:** `hospital@demo.com`
- **Password:** `demo123`
- **Dashboard:** Hospital Admin Dashboard
- **Access:** Doctor management, appointment approvals, bed tracking

### 3️⃣ Hotel Admin Account
**Role:** Hotel/Recovery Facility Management
- **Email:** `hotel@demo.com`
- **Password:** `demo123`
- **Dashboard:** Hotel Admin Dashboard
- **Access:** Room management, booking approvals, occupancy tracking

### 4️⃣ Emergency Admin Account
**Role:** Emergency Services Management
- **Email:** `emergency@demo.com`
- **Password:** `demo123`
- **Dashboard:** Emergency Admin Dashboard
- **Access:** SOS management, ambulance dispatch, emergency tracking

### 5️⃣ Patient Account
**Role:** Patient / Healthcare Consumer
- **Email:** `patient@demo.com`
- **Password:** `demo123`
- **Dashboard:** Patient Dashboard
- **Access:** Hospital search, book appointments, recovery stays, emergency SOS

---

## 🔐 How to Login

1. **Open the application:** http://localhost:3000
2. **Enter email** from any demo account above
3. **Enter password:** `demo123`
4. **Click "Sign In"**
5. **You'll be automatically redirected** to your role's dashboard

---

## 📝 How to Create New Accounts

Users can create their own accounts by:

1. Go to http://localhost:3000
2. Click **"Register Now"** button
3. Fill in the registration form:
   - **Full Name:** Your name
   - **Email:** Your email address
   - **Role:** Select from 5 options:
     - 👤 Patient
     - 🏥 Hospital Admin
     - 🏨 Hotel Admin
     - 🚑 Emergency Admin
   - **Password:** Create a password
   - **Confirm Password:** Re-enter password
4. Click **"Create Account"**
5. You'll be logged in and redirected to your dashboard

### Role Selection Guide:
- **Patient:** If you want to book appointments or recovery stays
- **Hospital Admin:** If you manage a hospital
- **Hotel Admin:** If you manage recovery/hotel facilities
- **Emergency Admin:** If you manage emergency services
- **Super Admin:** Cannot be created via registration (admin-only)

---

## 🎯 Testing Each Dashboard

### Test as Patient
```
Email: patient@demo.com
Password: demo123
Features: Hospital search, appointments, bookings, emergency SOS
```

### Test as Hospital Admin
```
Email: hospital@demo.com
Password: demo123
Features: Doctor management, appointment tracking, bed occupancy
```

### Test as Hotel Admin
```
Email: hotel@demo.com
Password: demo123
Features: Room management, booking approvals, occupancy reports
```

### Test as Emergency Admin
```
Email: emergency@demo.com
Password: demo123
Features: SOS management, ambulance dispatch, emergency tracking
```

### Test as Super Admin
```
Email: superadmin@demo.com
Password: demo123
Features: System-wide analytics, user approvals, platform settings
```

---

## 🐛 Troubleshooting

### "Can't Login"
- ✅ Make sure both servers are running
- ✅ Check that MongoDB is running on localhost:27017
- ✅ Try the demo credentials above (password is `demo123`)
- ✅ Make sure you're using the correct email

### "Can't Register"
- ✅ Check if email already exists (try a different email)
- ✅ Make sure all fields are filled
- ✅ Password must be at least 6 characters
- ✅ Passwords must match in confirmation

### "Login Timeout"
- ✅ Make sure backend is running: `npm start` in `/backend` folder
- ✅ Make sure MongoDB is running locally
- ✅ Check terminal for any error messages

---

## 🚀 Quick Start

**To login immediately:**
1. Go to http://localhost:3000
2. Use: `patient@demo.com` / `demo123`
3. Start exploring!

**To test all features:**
- Login as each role to see their unique dashboards
- Try creating hospitals, appointments, bookings as different admin roles
- Use emergency SOS feature on patient dashboard

---

## 📊 User Roles & Permissions

| Feature | Patient | Hospital Admin | Hotel Admin | Emergency Admin | Super Admin |
|---------|---------|---|---|---|---|
| View Hospitals | ✅ | - | - | - | ✅ |
| Book Appointments | ✅ | - | - | - | ✅ |
| Book Hotels | ✅ | - | - | - | ✅ |
| Emergency SOS | ✅ | - | - | - | ✅ |
| Manage Hospitals | - | ✅ | - | - | ✅ |
| Manage Hotels | - | - | ✅ | - | ✅ |
| Manage Emergencies | - | - | - | ✅ | ✅ |
| System Admin | - | - | - | - | ✅ |

---

## 💡 Tips for Demo

1. **Use different browsers/tabs** to test interactions between roles
2. **Create test accounts** to simulate real user scenarios
3. **Check browser console** (F12) for detailed error messages
4. **All data is stored in MongoDB** - changes persist across sessions
5. **Default password is flexible** - change demo accounts' passwords as needed

---

**Last Updated:** May 26, 2026
**System Version:** 1.0.0 Production-Ready
