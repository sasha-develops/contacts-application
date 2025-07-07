# Use the official PHP 8.2 FPM image
FROM php:8.2-fpm AS app-base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first for better Docker layer caching
COPY composer.json composer.lock ./

# Install PHP dependencies (including dev dependencies for development)
RUN composer install --no-scripts --no-autoloader --prefer-dist

# Copy the rest of the application code
COPY . .

# Generate autoload files
RUN composer dump-autoload --optimize

# Second stage: Build the queue worker
FROM app-base AS queue-worker

# Copy Supervisor configuration from the queue_worker directory
COPY .dev-ops/queue_worker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html/storage

# Set the working directory
WORKDIR /var/www/html

# Run Laravel commands and Supervisor
CMD /bin/sh -c "php artisan config:cache && \
                php artisan route:cache && \
                supervisord -c /etc/supervisor/conf.d/supervisord.conf"
