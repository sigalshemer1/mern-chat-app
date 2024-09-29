# backend/Dockerfile

# Use Node.js image as the base image
FROM node:20

# Create and set the working directory inside the container
WORKDIR /app

# Copy the root-level package.json and package-lock.json into the container
COPY ../package*.json ./

# Install the dependencies (both frontend and backend dependencies)
RUN npm install

# Copy the entire backend folder content into the container
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]

