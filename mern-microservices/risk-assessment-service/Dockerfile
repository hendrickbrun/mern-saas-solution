# risk-assessment-service/Dockerfile

# Use Node.js official image as a build stage
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Node.js official image for production
FROM node:14
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]

