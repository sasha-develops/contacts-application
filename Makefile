# Root Makefile for Contacts Application
# This Makefile provides convenient commands to manage both backend and frontend

# Variables
BACKEND_DIR = backend
FRONTEND_DIR = frontend

# Backend commands
build:
	@echo "Building backend..."
	@cd $(BACKEND_DIR) && make build

start:
	@echo "Starting backend..."
	@cd $(BACKEND_DIR) && make start

stop:
	@echo "Stopping backend..."
	@cd $(BACKEND_DIR) && make stop

install:
	@echo "Installing backend dependencies..."
	@cd $(BACKEND_DIR) && make install

migrate:
	@echo "Running database migrations..."
	@cd $(BACKEND_DIR) && make migrate

seed:
	@echo "Seeding database..."
	@cd $(BACKEND_DIR) && make seed

key:
	@echo "Generating application key..."
	@cd $(BACKEND_DIR) && make key

ssh:
	@echo "SSH into backend container..."
	@cd $(BACKEND_DIR) && make ssh

test:
	@echo "Running backend tests..."
	@cd $(BACKEND_DIR) && make test

clean:
	@echo "Cleaning backend..."
	@cd $(BACKEND_DIR) && make clean

rebuild:
	@echo "Rebuilding backend..."
	@cd $(BACKEND_DIR) && make rebuild

# Frontend commands
frontend-install:
	@echo "Installing frontend dependencies..."
	@cd $(FRONTEND_DIR) && make install

frontend-start:
	@echo "Starting frontend..."
	@cd $(FRONTEND_DIR) && make start

frontend-build:
	@echo "Building frontend..."
	@cd $(FRONTEND_DIR) && make build

frontend-test:
	@echo "Running frontend tests..."
	@cd $(FRONTEND_DIR) && make test

frontend-clean:
	@echo "Cleaning frontend..."
	@cd $(FRONTEND_DIR) && make clean

# Combined commands
setup: build start key migrate seed frontend-install
	@echo "Setup complete! Backend running on http://localhost:8080"
	@echo "Run 'make frontend-start' to start the frontend development server"

# ONE COMMAND TO START EVERYTHING
start-all: build start key migrate seed frontend-install
	@echo "🚀 Starting complete development environment..."
	@echo "Backend: http://localhost:8080"
	@echo "Frontend: http://localhost:3000 (starting now...)"
	@cd $(FRONTEND_DIR) && make start

# Alias for start-all
dev: start-all
	@echo "Development environment ready!"

# Stop everything
stop-all:
	@echo "Stopping all services..."
	@cd $(BACKEND_DIR) && make stop
	@echo "Frontend will stop when you press Ctrl+C"

.PHONY: build start stop install migrate seed key ssh test clean rebuild frontend-install frontend-start frontend-build frontend-test frontend-clean setup start-all dev stop-all 