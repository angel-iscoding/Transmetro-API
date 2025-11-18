FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first to take advantage of cache
COPY package*.json ./
RUN npm install

# Copy configuration files
COPY tsconfig*.json ./
COPY . .

# Build the application
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

# Copy dependency files first to take advantage of cache
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy compiled files from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/main"]