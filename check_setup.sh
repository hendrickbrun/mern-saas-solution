#!/bin/bash

# Check for Homebrew
if ! command -v brew &> /dev/null
then
    echo "Homebrew is not installed. Please install Homebrew first."
    exit
fi
echo "Homebrew is installed."

# Check for Node.js and npm
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js first."
    exit
fi
echo "Node.js is installed."

if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm first."
    exit
fi
echo "npm is installed."

# Check for Git
if ! command -v git &> /dev/null
then
    echo "Git is not installed. Please install Git first."
    exit
fi
echo "Git is installed."

# Check for Docker
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Please install Docker first."
    exit
fi
echo "Docker is installed."

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit
fi
echo "Docker Compose is installed."

# Check project structure
if [ ! -d "backend" ]; then
    echo "Backend directory is missing."
    exit
fi
echo "Backend directory exists."

if [ ! -d "frontend" ]; then
    echo "Frontend directory is missing."
    exit
fi
echo "Frontend directory exists."

if [ ! -f "docker-compose.yml" ]; then
    echo "docker-compose.yml file is missing."
    exit
fi
echo "docker-compose.yml file exists."

# Check backend setup
if [ ! -f "backend/server.js" ]; then
    echo "backend/server.js file is missing."
    exit
fi
echo "backend/server.js file exists."

if [ ! -f "backend/Dockerfile" ]; then
    echo "backend/Dockerfile file is missing."
    exit
fi
echo "backend/Dockerfile file exists."

# Check frontend setup
if [ ! -f "frontend/Dockerfile" ]; then
    echo "frontend/Dockerfile file is missing."
    exit
fi
echo "frontend/Dockerfile file exists."

# Check Docker services
docker-compose up -d --build
sleep 10

backend_status=$(docker inspect -f '{{.State.Running}}' $(docker-compose ps -q backend))
frontend_status=$(docker inspect -f '{{.State.Running}}' $(docker-compose ps -q frontend))
mongo_status=$(docker inspect -f '{{.State.Running}}' $(docker-compose ps -q mongo))

if [ "$backend_status" != "true" ]; then
    echo "Backend container is not running correctly."
    exit
fi
echo "Backend container is running."

if [ "$frontend_status" != "true" ]; then
    echo "Frontend container is not running correctly."
    exit
fi
echo "Frontend container is running."

if [ "$mongo_status" != "true" ]; then
    echo "Mongo container is not running correctly."
    exit
fi
echo "Mongo container is running."

echo "All checks passed successfully!"
