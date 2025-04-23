# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config (e.g., for SPA routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (documented only)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
