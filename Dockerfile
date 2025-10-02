# --- Base image with Node.js ---
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- Development stage ---
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# --- Build stage for production ---
FROM base AS build
RUN npm run build

# --- Production stage (Nginx) ---
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]