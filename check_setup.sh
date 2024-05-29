#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" &> /dev/null
}

# Check for Homebrew
if ! command_exists brew; then
    echo "Homebrew is not installed. Please install Homebrew first."
    exit 1
fi
echo "Homebrew is installed."

# Check for Node.js and npm
if ! command_exists node; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi
echo "Node.js is installed."

if ! command_exists npm; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi
echo "npm is installed."

# Check for Git
if ! command_exists git; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi
echo "Git is installed."

# Check for Docker
if ! command_exists docker; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi
echo "Docker is installed."

# Check for Docker Compose
if ! command_exists docker-compose; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi
echo "Docker Compose is installed."

# Check project structure
if [ ! -d "backend" ]; then
    echo "Backend directory is missing."
    exit 1
fi
echo "Backend directory exists."

if [ ! -d "frontend" ]; then
    echo "Frontend directory is missing."
    exit 1
fi
echo "Frontend directory exists."

if [ ! -f "docker-compose.yml" ]; then
    echo "docker-compose.yml file is missing."
    exit 1
fi
echo "docker-compose.yml file exists."

# Check backend setup
if [ ! -f "backend/server.js" ]; then
    echo "backend/server.js file is missing."
    exit 1
fi
echo "backend/server.js file exists."

if [ ! -f "backend/Dockerfile" ]; then
    echo "backend/Dockerfile file is missing."
    exit 1
fi
echo "backend/Dockerfile file exists."

# Check frontend setup
if [ ! -f "frontend/Dockerfile" ]; then
    echo "frontend/Dockerfile file is missing."
    exit 1
fi
echo "frontend/Dockerfile file exists."

# Check Docker services
docker-compose up -d --build
sleep 10

backend_container=$(docker-compose ps -q backend)
frontend_container=$(docker-compose ps -q frontend)
mongo_container=$(docker-compose ps -q mongo)

if [ -z "$backend_container" ]; then
    echo "Backend container ID is empty. Backend container may not be running."
    exit 1
fi

if [ -z "$frontend_container" ]; then
    echo "Frontend container ID is empty. Frontend container may not be running."
    exit 1
fi

if [ -z "$mongo_container" ]; then
    echo "Mongo container ID is empty. Mongo container may not be running."
    exit 1
fi

backend_status=$(docker inspect -f '{{.State.Running}}' $backend_container)
frontend_status=$(docker inspect -f '{{.State.Running}}' $frontend_container)
mongo_status=$(docker inspect -f '{{.State.Running}}' $mongo_container)

if [ "$backend_status" != "true" ]; then
    echo "Backend container is not running correctly."
    exit 1
fi
echo "Backend container is running."

if [ "$frontend_status" != "true" ]; then
    echo "Frontend container is not running correctly."
    exit 1
fi
echo "Frontend container is running."

if [ "$mongo_status" != "true" ]; then
    echo "Mongo container is not running correctly."
    exit 1
fi
echo "Mongo container is running."

echo "All checks passed successfully!"
