# frontend/Dockerfile

# Step 1: Build the frontend
FROM node:20 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for frontend
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend for production
RUN npm run build

# Step 2: Serve the frontend using an Nginx web server
FROM nginx:alpine

# Copy the built frontend from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to serve the frontend
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
