# ============================================================================
# Multi-stage Dockerfile for Carousel API VPS
# ============================================================================

# ============================================================================
# Stage 1: Build
# ============================================================================
FROM node:18-bullseye AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# ============================================================================
# Stage 2: Production (using Puppeteer's official image with Chrome pre-installed)
# ============================================================================
FROM ghcr.io/puppeteer/puppeteer:21.11.0

USER root

WORKDIR /app

# Copy package files and install production dependencies only
# (Chromium already included in base image, skip download)
COPY package*.json ./
COPY package-lock.json ./
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy public assets (fonts, svgs, etc.)
COPY public ./public

# Note: Running as root for GCP key file access
# In production, consider copying the key into the image or using proper volume permissions

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "dist/server.js"]
