# Contacts Application

This project is a Contacts Application built with Laravel for the backend and React for the frontend. The application allows users to create, read, update, and delete contacts. The backend is containerized using Docker, ensuring a consistent development environment.

## Project Structure

The project is organized as follows:

```plaintext
contacts-application/
├── Makefile                       # Root Makefile with convenient commands
├── backend/                       # Laravel backend application
│   ├── .dev-ops/                  # Docker-related files (Dockerfile, Nginx config)
│   ├── Makefile                   # Backend-specific commands
│   ├── docker-compose.yml         # Docker Compose configuration for backend services
│   └── **/**                      # Laravel application files
├── frontend/                      # React frontend application
│   ├── Makefile                   # Frontend-specific commands
│   └── **/**                      # React application files
└── README.md                      # This file
```

## Installation Guide

Follow these steps to set up the application:

### Prerequisites

1. **Install Docker and Docker Compose**
    - Download and install Docker from the [official website](https://www.docker.com/products/docker-desktop)
    - Verify installation:
      ```bash
      docker --version
      docker-compose --version
      ```

2. **Install Node.js and npm** (for frontend)
    ```bash
    node -v && npm -v
    ```
    Recommended versions: Node.js v18+ and npm v8+
    
    If not installed, install via Homebrew (macOS):
    ```bash
    # Check if you have Homebrew
    brew -v
    # If no brew, install it:
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # Install Node.js
    brew update && brew install node
    ```

3. **Register at Pusher** (for real-time features)
    - Go to https://pusher.com/ and sign up for a free account
    - Create a new app and select "mt1" cluster
    - Get your credentials from the "App Keys" section:
      - PUSHER_APP_ID
      - PUSHER_APP_KEY  
      - PUSHER_APP_SECRET
      - PUSHER_APP_CLUSTER

### Quick Setup (Recommended)

**Option 1: Automatic Setup Script** ⭐

```bash
# Clone and navigate to the project
cd contacts-application

# 🚀 AUTOMATIC ENVIRONMENT SETUP (fixes common issues)
./setup-env.sh

# Add your Pusher credentials to backend/.env and frontend/.env

# START EVERYTHING
make start-all
```

**Option 2: Manual Environment Setup**

```bash
# Clone and navigate to the project
cd contacts-application

# Set up environment files
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env
cd ..

# IMPORTANT: Check that backend/.env has DB_PORT=3306 (not 13306)
# Add your Pusher credentials to backend/.env and frontend/.env

# 🚀 ONE COMMAND TO START EVERYTHING
make start-all
```

**The automatic setup script (`./setup-env.sh`) handles:**
- Creates `.env` files from examples
- Fixes `DB_PORT` configuration (3306 vs 13306 issue)
- Sets default `APP_KEY` for take-home assignment
- Provides clear next steps

This single command will:
- Build and start the backend Docker containers
- Generate application key
- Run database migrations and seeders
- Install frontend dependencies
- Start both backend (http://localhost:8080) and frontend (http://localhost:3000)

### Manual Setup

#### 1. Set Up Environment Variables

```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env and add your database and Pusher credentials

# Frontend environment  
cd ../frontend
cp .env.example .env
# Edit .env and add your API URL and Pusher credentials
cd ..
```

#### 2. Backend Setup

From the project root:

```bash
# Build and start backend services
make build
make start

# Generate application key
make key

# Run database migrations
make migrate

# Seed test data
make seed
```

The backend will be available at: http://localhost:8080

#### 3. Frontend Setup

```bash
# Install dependencies and start development server
make frontend-install
make frontend-start
```

The frontend will be available at: http://localhost:3000

### Available Commands

#### Backend Commands
- `make build` - Build Docker containers
- `make start` - Start Docker containers  
- `make stop` - Stop Docker containers
- `make migrate` - Run database migrations
- `make seed` - Seed test data
- `make key` - Generate application key
- `make ssh` - SSH into app container
- `make test` - Run backend tests
- `make clean` - Clean containers and volumes

#### Frontend Commands
- `make frontend-install` - Install dependencies
- `make frontend-start` - Start development server
- `make frontend-build` - Build for production
- `make frontend-test` - Run frontend tests

#### Combined Commands
- `make start-all` - **🚀 ONE COMMAND TO START EVERYTHING** (recommended)
- `make setup` - Complete backend setup + frontend install (backend running, frontend ready)
- `make dev` - Alias for start-all
- `make stop-all` - Stop all services

### Troubleshooting

#### Common Issues

1. **Port conflicts**: If ports 3306, 8080, or 3000 are in use, stop conflicting services or modify the ports in docker-compose.yml

2. **Database connection issues during setup**: 
   - If you get "Connection refused" errors during migration, the system now includes automatic database health checks
   - If the issue persists, manually check that your `.env` file has `DB_PORT=3306` (not 13306)
   - The database container may take 30-40 seconds to fully initialize on first run

3. **APP_KEY issues** ("No APP_KEY variable found"):
   - Use the automatic setup script: `./setup-env.sh` (recommended for take-home assignment)
   - Or manually run: `make key` (will auto-create .env if missing)
   - The setup script includes a default APP_KEY suitable for QA take-home assignments

4. **Permission issues**: If you encounter permission errors:
   ```bash
   make clean
   make rebuild
   ```

5. **Missing dependencies**: If Composer or npm fails, try:
   ```bash
   # Backend
   make clean && make rebuild
   
   # Frontend  
   make frontend-clean && make frontend-install
   ```

### Development

- Backend API: http://localhost:8080/api
- Frontend: http://localhost:3000
- Database: localhost:3306 (from host machine)
- Redis: localhost:6379

The application includes real-time features using Pusher for contact updates and notifications.
