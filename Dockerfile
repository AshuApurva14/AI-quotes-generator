
# Stage 1: Build the Vite React app
FROM node:20.19.0-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the built app using nginx
FROM nginx:stable-alpine AS production

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
