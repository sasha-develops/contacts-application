# Variables
DOCKER_COMPOSE = docker-compose
APP_CONTAINER = laravel_app
QUEUE_CONTAINER = laravel_queue_worker

# Rebuild everything from scratch
rebuild: clean build install

# Stop and remove all containers, volumes, and images related to the app
clean-all: clean
	$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans

# Stop and remove all containers and volumes related to the app
clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans

# Build everything from scratch without using cache
build:
	$(DOCKER_COMPOSE) build --no-cache

# Install the app (start services, install dependencies, run migrations)
install: start
	docker exec $(APP_CONTAINER) composer install

# Start the app (Docker containers)
start:
	$(DOCKER_COMPOSE) up -d

# Stop the app (Docker containers)
stop:
	$(DOCKER_COMPOSE) down

# SSH into the app container using docker exec
ssh:
	docker exec -it $(APP_CONTAINER) /bin/sh

ssh-queue:
	docker exec -it $(APP_CONTAINER) /bin/sh

# Wait for database to be ready
wait-for-db:
	@echo "Waiting for database to be ready..."
	@until docker exec $(APP_CONTAINER) php -r "new PDO('mysql:host=db;port=3306;dbname=contacts_db', 'app', 'yourpassword');" 2>/dev/null; do \
		echo "Database not ready yet, waiting..."; \
		sleep 2; \
	done
	@echo "Database is ready!"

# Run migration (with database wait)
migrate: wait-for-db
	docker exec -it $(APP_CONTAINER) php artisan migrate

# Seed test data
seed:
	docker exec -it $(APP_CONTAINER) php artisan db:seed

clear-cache:
	docker exec -it $(APP_CONTAINER) php artisan optimize:clear
	docker exec -it $(APP_CONTAINER) php artisan route:cache
	docker exec -it $(APP_CONTAINER) php artisan config:cache
	docker exec -it $(QUEUE_CONTAINER) php artisan optimize:clear
	docker exec -it $(QUEUE_CONTAINER) php artisan route:cache
	docker exec -it $(QUEUE_CONTAINER) php artisan config:cache

# Run PHP unit tests
test:
	docker exec -it $(APP_CONTAINER) php artisan test
# Generate application key (auto-creates .env if missing)
key:
	@if [ ! -f .env ]; then \
		echo "Creating .env file from .env.example..."; \
		cp .env.example .env; \
	fi
	docker exec -it $(APP_CONTAINER) php artisan key:generate

.PHONY: rebuild clean-all clean build install start stop ssh test wait-for-db
