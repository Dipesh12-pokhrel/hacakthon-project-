const API_BASE_URL = 'http://localhost:5000/api';

class APIClient {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async makeRequest(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        this.clearToken();
        window.location.href = '/frontend/index.html';
      }

      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Auth endpoints
  register(data) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  login(data) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  getCurrentUser() {
    return this.makeRequest('/auth/me');
  }

  // Hospital endpoints
  getAllHospitals() {
    return this.makeRequest('/hospitals');
  }

  getHospital(id) {
    return this.makeRequest(`/hospitals/${id}`);
  }

  createHospital(data) {
    return this.makeRequest('/hospitals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  updateHospital(id, data) {
    return this.makeRequest(`/hospitals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Hotel endpoints
  getAllHotels() {
    return this.makeRequest('/hotels');
  }

  getHotel(id) {
    return this.makeRequest(`/hotels/${id}`);
  }

  createHotel(data) {
    return this.makeRequest('/hotels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  updateHotel(id, data) {
    return this.makeRequest(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Appointment endpoints
  createAppointment(data) {
    return this.makeRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  getUserAppointments() {
    return this.makeRequest('/appointments/my-appointments');
  }

  getHospitalAppointments(hospitalId) {
    return this.makeRequest(`/appointments/hospital/${hospitalId}`);
  }

  updateAppointmentStatus(id, status) {
    return this.makeRequest(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Booking endpoints
  createBooking(data) {
    return this.makeRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  getUserBookings() {
    return this.makeRequest('/bookings/my-bookings');
  }

  getHotelBookings(hotelId) {
    return this.makeRequest(`/bookings/hotel/${hotelId}`);
  }

  updateBookingStatus(id, status) {
    return this.makeRequest(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Emergency endpoints
  createEmergency(data) {
    return this.makeRequest('/emergency', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  getUserEmergencies() {
    return this.makeRequest('/emergency/my-emergencies');
  }

  getAllEmergencies() {
    return this.makeRequest('/emergency');
  }

  assignAmbulance(id, ambulanceId, eta) {
    return this.makeRequest(`/emergency/${id}/assign-ambulance`, {
      method: 'PATCH',
      body: JSON.stringify({ ambulanceId, eta }),
    });
  }

  updateEmergencyStatus(id, status) {
    return this.makeRequest(`/emergency/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Generic HTTP methods
  async get(endpoint) {
    return this.makeRequest(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.makeRequest(endpoint, { method: 'DELETE' });
  }
}

const api = new APIClient();

// Utility functions
function showAlert(message, type = 'success') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  
  const content = document.querySelector('.content') || document.body;
  content.insertBefore(alert, content.firstChild);

  setTimeout(() => alert.remove(), 5000);
}

function showLoader(show = true) {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = show ? 'block' : 'none';
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('en-NP', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}
