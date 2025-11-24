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

## Quick Start

### 1. Clone and Setup

git clone https://github.com/MaltSun/TasteEat.git
cd TasteEat

### 1. Deploy Application

# Build and start all services

docker-compose up -d --build

# Or start without rebuild

docker-compose up -d

## Verify Deployment

# Check container status

docker-compose ps

# Monitor startup logs

docker-compose logs -f

# Test backend health

curl http://localhost:3000/api/health
