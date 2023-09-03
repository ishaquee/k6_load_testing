#!./bin/bash


# This script installs k6 and performs any necessary setup without using sudo.

# Update the package list
apt-get update

# Install required dependencies
apt-get install -y dirmngr

# Add the k6 repository and key
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list

# Update the package list again
apt-get update

# Install k6
apt-get install -y k6

# Print k6 version to verify installation
k6 version

# Additional setup steps can be added here if needed
