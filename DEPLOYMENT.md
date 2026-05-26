# 🚀 Production Deployment Guide

## Pre-Deployment Checklist

### Security Hardening
- [ ] Generate strong JWT_SECRET (minimum 32 characters)
- [ ] Change MongoDB default password
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure firewall rules
- [ ] Set up DDoS protection
- [ ] Enable database backups
- [ ] Implement rate limiting
- [ ] Configure CORS for production domain

### Environment Configuration
- [ ] Set NODE_ENV=production
- [ ] Update MONGODB_URI to Atlas/managed DB
- [ ] Update CORS_ORIGIN to production domain
- [ ] Configure email service (SMTP)
- [ ] Set up monitoring & logging
- [ ] Configure CDN for static files

### Application Testing
- [ ] Run unit tests (if available)
- [ ] Perform integration testing
- [ ] Load testing (1000+ concurrent users)
- [ ] Security audit & penetration testing
- [ ] User acceptance testing (UAT)
- [ ] Browser compatibility testing

---

## Deployment Option 1: Using Docker Compose (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Docker Hub account (optional, for image hosting)

### Step 1: Prepare Environment
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit with production values
nano backend/.env
```

### Step 2: Configure Environment Variables
```env
# backend/.env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/medistay?retryWrites=true&w=majority
JWT_SECRET=generate-strong-random-value-here
CORS_ORIGIN=https://yourdomain.com
```

### Step 3: Build and Deploy
```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Step 4: Verify Deployment
```bash
# Test backend health
curl http://localhost:5000/health

# Test frontend
curl http://localhost:3000

# Check database connection
docker-compose logs backend | grep -i mongodb
```

---

## Deployment Option 2: AWS EC2

### Step 1: Launch EC2 Instance
```bash
# Requirements:
# - OS: Ubuntu 20.04 LTS
# - Instance: t3.medium or larger
# - Storage: 30GB
# - Security: Configure security groups
```

### Step 2: SSH and Setup
```bash
# Connect to instance
ssh -i key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB (or use MongoDB Atlas)
sudo apt install -y mongodb

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 3: Clone Repository
```bash
# Clone project
git clone <your-repo-url>
cd medistay

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (if using Node server)
cd ../frontend
npm install
```

### Step 4: Configure Backend
```bash
# Create .env file
nano .env

# Add production configuration
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/medistay
JWT_SECRET=your-strong-secret-key
CORS_ORIGIN=https://yourdomain.com
```

### Step 5: Start Services with PM2
```bash
cd backend

# Start backend
pm2 start server.js --name "medistay-backend"

# Configure to start on reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs medistay-backend
```

### Step 6: Configure Nginx
```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/medistay

# Add configuration:
server {
    listen 80;
    server_name yourdomain.com;
    
    root /home/ubuntu/medistay/frontend;
    index index.html;
    
    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/medistay /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 7: SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Deployment Option 3: Heroku

### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Linux/Windows: Download from heroku.com/download
```

### Step 2: Create Heroku App
```bash
heroku login

# Create app
heroku create medistay-app

# Add MongoDB Atlas addon
heroku addons:create mongolab:sandbox

# View database connection
heroku config:get MONGODB_URI
```

### Step 3: Configure Environment
```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-strong-secret-key
heroku config:set CORS_ORIGIN=https://medistay-app.herokuapp.com
```

### Step 4: Prepare for Deployment
```bash
# Ensure Procfile exists in backend/
echo "web: node server.js" > backend/Procfile

# Add buildpacks
heroku buildpacks:add heroku/nodejs
```

### Step 5: Deploy
```bash
# Deploy to Heroku
cd backend
git subtree push --prefix backend heroku main

# View logs
heroku logs --tail

# Open app
heroku open
```

---

## Deployment Option 4: DigitalOcean App Platform

### Step 1: Connect Repository
- Go to DigitalOcean console
- Create new App
- Connect GitHub repository
- Select "monorepo" configuration

### Step 2: Configure Services
```yaml
# Backend Service
name: backend
source_type: github
github:
  branch: main
build_command: npm install
run_command: npm start

# Frontend Service
name: frontend
source_type: github
github:
  branch: main
build_command: npm install
run_command: npm start
```

### Step 3: Environment Variables
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/medistay
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://yourdomain-do-app.ondigitalocean.app
```

### Step 4: Deploy
- Review configuration
- Click "Deploy"
- Wait for builds to complete
- Access from provided URL

---

## Monitoring & Maintenance

### Application Monitoring
```bash
# Using PM2 Plus (recommended)
pm2 plus link

# View real-time metrics
pm2 web  # Opens http://localhost:9615

# Monitor specific process
pm2 monitor medistay-backend
```

### Database Backups
```bash
# MongoDB Atlas automatic backups
# - Daily backups included
# - 7-day retention
# - Manual backups available

# Local backup
mongodump --uri "mongodb://user:pass@localhost:27017/medistay" --out ./backup

# Restore
mongorestore --uri "mongodb://user:pass@localhost:27017/medistay" ./backup/medistay
```

### Log Aggregation
```bash
# Using Papertrail (recommended)
heroku drains:add syslog+tls://logs.papertrailapp.com:1234

# Using CloudWatch (AWS)
# Configure from AWS Console
```

### Performance Monitoring
- Monitor API response times (target: < 500ms)
- Track error rates (target: < 1%)
- Monitor database queries
- Track memory usage
- Monitor CPU usage

---

## Scaling Strategy

### Horizontal Scaling
```bash
# Load balancer setup (AWS ELB)
# - 2-4 backend instances
# - Auto-scaling group
# - Health checks every 30s

# Database read replicas
# - MongoDB Atlas: M10+ plans include replication
# - Configure read preferences
```

### Vertical Scaling
- Upgrade instance size gradually
- Monitor resource usage
- Scale up before hitting limits

### Caching Strategy
- Implement Redis for session management
- Cache API responses (CloudFlare)
- CDN for static assets

---

## Security Hardening Checklist

- [ ] Enable HTTPS everywhere
- [ ] Use strong JWT_SECRET
- [ ] Enable database authentication
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable request validation
- [ ] Use environment variables for secrets
- [ ] Enable CORS for trusted domains only
- [ ] Regular security updates
- [ ] SQL injection prevention (N/A - NoSQL)
- [ ] XSS protection via input sanitization
- [ ] CSRF protection for state-changing operations
- [ ] Regular security audits
- [ ] Penetration testing before launch

---

## Troubleshooting Deployment Issues

### Backend Won't Start
```bash
# Check logs
pm2 logs

# Common issues:
# 1. Port already in use: Change PORT in .env
# 2. MongoDB connection: Verify MONGODB_URI
# 3. Missing dependencies: Run npm install
```

### Frontend Not Loading
```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify file permissions
chmod -R 755 /var/www/medistay/frontend
```

### Database Connection Issues
```bash
# Test MongoDB connection
mongo "mongodb://user:pass@host:27017/medistay"

# Check connection string format
# Local: mongodb://localhost:27017/medistay
# Atlas: mongodb+srv://user:pass@cluster.mongodb.net/medistay
```

---

## Performance Optimization

### Backend Optimization
- Implement caching (Redis)
- Database query optimization
- API response compression
- Connection pooling

### Frontend Optimization
- Minify CSS/JS
- Image optimization
- Code splitting
- Lazy loading
- CDN delivery

### Database Optimization
- Create indexes on frequently queried fields
- Archive old data
- Query optimization
- Connection pooling

---

## Post-Deployment

### 1. Domain Configuration
```bash
# Update DNS records
# A record: yourdomain.com → your-server-ip

# SSL certificate
# Obtain from Let's Encrypt or CA
# Auto-renew configured
```

### 2. Email Configuration
```bash
# Setup SMTP for notifications
# Configure in backend .env
# Test with transactional email
```

### 3. Analytics
```bash
# Setup Google Analytics
# Configure in frontend
# Monitor user behavior
```

### 4. Monitoring Setup
```bash
# Configure application monitoring
# Set up error tracking (Sentry)
# Configure performance monitoring
# Setup uptime monitoring
```

---

## Support & Rollback

### Rollback Procedure
```bash
# View deployment history
heroku releases

# Rollback to previous version
heroku releases:rollback v123

# For Docker deployments
git reset --hard <commit-hash>
docker-compose up --build
```

### Emergency Contact
- **Status Page**: status.medistay.com
- **Email**: support@medistay.com
- **Chat**: Slack channel #production-incidents

---

**Deployment Status**: ✅ Ready for Production  
**Last Updated**: January 2025  
**Version**: 1.0.0
