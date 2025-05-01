# This Dockerfile is for building a Node.js application image.
FROM node:20.19.0-slim

# Set the working directory inside the container
WORKDIR /app

COPY package.json package-lock.json ./

# Install the application dependencies
RUN npm install --production

# Copy the application source code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "dev" ]
