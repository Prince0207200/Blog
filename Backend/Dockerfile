# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Set environment variables from .env (done in docker-compose.yml)
# Start the app
CMD ["node", "src/index.js"]
