# Stage 1 — Build (optional for static files, but future-proof)
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
 
# Stage 2 — Serve with NGINX
FROM nginx:stable-alpine
COPY --from=builder /app /usr/share/nginx/html
 
# Expose port 80 for ALB routing
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]