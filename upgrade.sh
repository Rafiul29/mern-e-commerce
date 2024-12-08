#!/bin/bash

# Update project dependencies
echo "Updating project dependencies..."
npm upgrade

# Check for vulnerabilities
echo "Checking for vulnerabilities..."
npm audit

echo "Dependency update and vulnerability check complete."