// Shared Dashboard Utilities
// Global functions used by all admin dashboards

// API Client initialization (assuming api-client.js is loaded first)
const api = new APIClient('http://localhost:5000');

// Show alert notifications
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer') || createAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>${escapeHtml(message)}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; cursor: pointer; font-size: 1.2rem;">×</button>
        </div>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Create alert container if it doesn't exist
function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alertContainer';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        width: 400px;
        max-width: 90vw;
    `;
    document.body.appendChild(container);
    return container;
}

// Open modal dialog
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Close modal dialog
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Format date for display
function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format date and time for display
function formatDateTime(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone number
function isValidPhone(phone) {
    return /^\d{7,15}$/.test(phone.replace(/\D/g, ''));
}

// Deep copy object
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if user is authenticated
function checkAuth() {
    const token = api.getToken();
    if (!token) {
        window.location.href = '/frontend/index.html';
    }
}

// Check user role
function hasRole(role) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === role;
}

// Redirect based on role
function redirectByRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    switch(user.role) {
        case 'patient':
            window.location.href = '/frontend/user-dashboard.html';
            break;
        case 'hospital_admin':
            window.location.href = '/frontend/hospital-admin.html';
            break;
        case 'hotel_admin':
            window.location.href = '/frontend/hotel-admin.html';
            break;
        case 'emergency_admin':
            window.location.href = '/frontend/emergency-admin.html';
            break;
        case 'super_admin':
            window.location.href = '/frontend/super-admin.html';
            break;
        default:
            window.location.href = '/frontend/index.html';
    }
}

// Local storage utilities
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
};

// Initialize dashboard
function initDashboard() {
    checkAuth();
    applyTheme();
    setupEventListeners();
}

// Apply saved theme
function applyTheme() {
    if (storage.get('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Setup common event listeners
function setupEventListeners() {
    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showAlert, closeModal, openModal, escapeHtml, formatDate, formatDateTime,
        formatCurrency, isValidEmail, isValidPhone, deepCopy, debounce, checkAuth,
        hasRole, redirectByRole, storage, initDashboard, applyTheme, setupEventListeners
    };
}
