#!/bin/bash

# Define the endpoints and their names
endpoints=(
    "User Service http://localhost:5101/users"
    "Business Service http://localhost:5102/businesses"
    "Risk Assessment Service http://localhost:5103/riskassessments"
    "Notification Service http://localhost:5104/notifications"
    "Admin Service http://localhost:5105/admins"
)

# Function to check an endpoint
check_endpoint() {
    local name=$1
    local url=$2

    echo "Checking $name at $url"
    response=$(curl --write-out "%{http_code}" --silent --output /dev/null "$url")

    if [ "$response" -eq 200 ]; then
        echo "$name is up and running."
    else
        echo "$name is not reachable. Status code: $response"
    fi
    echo
}

# Loop through the endpoints and check each one
for endpoint in "${endpoints[@]}"; do
    # Split the endpoint string into name and URL
    name=$(echo $endpoint | cut -d ' ' -f 1-2)
    url=$(echo $endpoint | cut -d ' ' -f 3)

    check_endpoint "$name" "$url"
done
