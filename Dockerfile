# Dockerfile for ARM64 architecture

# ---- Base Stage ----
# Define a base stage to install dependencies to avoid repetition
FROM node:18-slim AS base
WORKDIR /usr/src/app

# Install Chromium and necessary dependencies for Puppeteer
# This is the key change to fix the ARM64 issue.
RUN apt-get update && apt-get install -yq chromium

# ---- Builder Stage ----
# This stage builds the TypeScript code.
FROM base AS builder

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run build

# ---- Production Stage ----
# This stage creates the final, lean image for running the application.
FROM base AS production
WORKDIR /usr/src/app


# Copy entrypoint
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled JavaScript from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

ENTRYPOINT ["./entrypoint.sh"]