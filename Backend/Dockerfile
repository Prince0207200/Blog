# Use official Node.js LTS image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy only package files first (leverages Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port (good for documentation and Docker Compose)
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]