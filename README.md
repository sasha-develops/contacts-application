# Contacts Application

This project is a Contacts Application built with Laravel for the backend and  React for the frontend. The application allows users to create, read, update, and delete contacts. The backend is containerized using Docker, ensuring a consistent development environment.

## Project Structure

The project is organized as follows:

```plaintext
contacts-application/
├── backend/                       # Laravel backend application
│   ├── .dev-ops/                  # Docker-related files (Dockerfile, Nginx config)
│   **/**                          # Laravel application files
│   ├── docker-compose.yml         # Docker Compose configuration for backend services
├── frontend/                      # Frontend application directory
│   **/**                          # React application files
└──                       # Makefile with backend commands
```

## Installation Guide

Follow these steps to set up the backend application:

### Preparation Step: Install Docker and Docker Compose

1. Install Docker:
    - Download and install Docker from the [official website](https://www.docker.com/products/docker-desktop).

2. Verify Docker installation:
   ```bash
   docker --version
   docker-compose --version
   ```

### 1. Set Up Environment Variables

1. Navigate to the `backend` directory.
2. Create a `.env` file by copying the example file:
    ```bash
    cd backend
    cp .env.example .env
    ```

### 2. Build and start backend(API)
1. From the project root directory, build and start the Docker containers:
    ```bash
      make build
      make start
      make key
      make migrate
      make seed
    ```
2. Once the services are running, open your browser and navigate to:
   ```
    http://localhost:8080
   ```
### 3. Build and start Front-end (React App)

#### Preparation:
1. Check if you have node js and npm
```bash
node -v && nvm -v
```
I am using below versions (most actual at moment of dev):
```aiignore
v23.1.0
0.39.7
```
2. If no node / npm, install via Homebrew(OSX):
```aiignore
#check you have Homebrew
brew -v
#if no brew install:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
##
brew update && brew install node
```

#### Build:
1. Move to the frontend directory and run the following commands:
    ```bash
    cd ../frontend
    npm install
    npm start
    ```


## Instructions for Installing and Runnings Cypress Tests

Cypress is a powerful end-to-end testing framework that is well-suited for testing both the UI and API of modern web applications. Here are the key reasons why we selected Cypress:

- **Comprehensive End-to-End Testing**: Covers the entire user journey, from UI interactions to API requests.
- **Real-Time Reloads and Debugging**: Provides an interactive test runner for real-time feedback.
- **Built-In Assertions and Commands**: Simplifies writing tests with intuitive APIs.
- **Automatic Waiting**: Reduces the need for manual waits, making tests more reliable.
- **Consistent Testing Environment**: Runs in the same environment as the application.
- **Easy Setup and Configuration**: Integrates seamlessly with modern web development workflows.
- **Detailed Documentation and Community Support**: Extensive resources and community support.


Assuming that all above steps for frontend and backend were completed successfully

1. **Navigate to the Project Directory**:
   
   ```bash
   cd /path/to/your/project
   ```
2. **Install Cypress: If Cypress is not already installed, run the following command in the project directory**:

    ```bash
    npm install cypress --save-dev
    ```
3. **Run Cypress Tests**:

    ```bash
    npx cypress open
    ```
This will open the Cypress Test Runner. Select the test file to run the tests.

4. **Running Tests in Headless Mode: To run the tests in headless mode (without opening the Cypress Test Runner), use the following command**:

    ```bash
    npx cypress run
    ```
5. **Running Specific Test Specs in Headless Mode: To run specific test specs in headless mode, use the following command**:

    ```bash
    npx cypress run --spec "cypress/e2e/your_spec_file.cy.js"
    ```
