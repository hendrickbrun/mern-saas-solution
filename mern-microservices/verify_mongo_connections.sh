#!/bin/bash

services=(
  "user-service"
  "business-service"
  "risk-assessment-service"
  "notification-service"
  "admin-service"
)

mongo_instances=(
  "mongo-user:27017"
  "mongo-business:27018"
  "mongo-risk:27019"
  "mongo-notification:27020"
  "mongo-admin:27021"
)

echo "Verifying MongoDB connections from each service..."

for service in "${services[@]}"; do
  echo "Verifying $service..."
  docker exec -it mern-microservices-$service-1 mongo --eval 'db.runCommand({ ping: 1 })' ${mongo_instances[$index]}
  if [ $? -eq 0 ]; then
    echo "$service can connect to ${mongo_instances[$index]}"
  else
    echo "$service cannot connect to ${mongo_instances[$index]}"
  fi
  index=$((index + 1))
done

echo "MongoDB connection verification complete."
