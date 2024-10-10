# Use an official Node runtime as the parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Install a simple HTTP server to serve static content
RUN npm install -g http-server

# Expose the port the app runs on
EXPOSE 8080

# Run the app
CMD ["http-server", "dist"]