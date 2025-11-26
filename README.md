# TasteEat - Food Delivery Application

## Project Overview
TasteEat is a full-stack web application for food delivery services built with modern technologies and containerized using Docker. The application features a responsive React frontend, Node.js backend API, and PostgreSQL database.

## Technology Stack
- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: PostgreSQL 15
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx
- **Environment**: Alpine Linux

## Prerequisites

- Docker Desktop 20.10+ or Docker Engine 24.0+
- Docker Compose 2.20+
- Git

## Project Structure
TasteEat/
├── TasteEatBackend/ 
│ ├── config/ 
│ ├── controllers/ 
│ ├── models/ 
│ ├── routes/  
│ ├── server.js 
│ ├── package.json
│ └── Dockerfile 
├── TasteEatFrontend/ 
│ ├── src/ 
│ ├── public/ 
│ ├── dist/ 
│ ├── nginx.conf 
│ ├── package.json
│ └── Dockerfile
├── docker-compose.yml 
├── .env
├──.dump.sql 
├── restore-db.bat 
└── README.md 

## Create.env file in the project root (the example is below)
### Database Configuration
DB_NAME=TasteEat
DB_USER=postgres
DB_PASSWORD=your_secure_password_here
DB_HOST=postgres
DB_PORT=5432

### Application Configuration
NODE_ENV=production
PORT=3000

### Frontend Configuration
REACT_APP_API_URL=http://localhost:3000/api

## Quick Start

### Clone and Setup
git clone https://github.com/MaltSun/TasteEat.git
cd TasteEat

### Deploy Application
#### Build and start all services
docker-compose up -d --build
#### Or start without rebuild
docker-compose up -d
#### Or start step by step
docker-compose up -d postgres    # Database first
docker-compose up -d backend     # Then backend
docker-compose up -d frontend    # Finally frontend

### Verify Deployment
#### Check container status
docker-compose ps
#### Monitor startup logs
docker-compose logs -f
#### Test backend health
curl http://localhost:3000/api/health
#### Open in browser http://localhost

## Backup
### Create backup in SQL format
docker-compose exec -T postgres pg_dump -U postgres -d TasteEat --format=plain > backup_$(date +%Y%m%d).sql
# Using provided script (Windows)
.\restore-db.bat

## Troubleshooting
### Port already in use
### Solution
- Find process using port (Windows): netstat -ano | findstr :80
- Kill process: taskkill /PID <PID> /F
- Or change port in docker-compose.yml:
ports:
  - "8080:80"
 
### Database connection refused
### Solution
- Check database status: docker-compose ps
- If database not running: docker-compose up -d postgres
- Wait for database to become healthy: docker-compose ps
- Check database connection: docker-compose exec postgres pg_isready -U postgres

### Permission denied in nginx
### Solution
- Stop container: docker-compose stop frontend
- Rebuild image: docker-compose up -d --build frontend
