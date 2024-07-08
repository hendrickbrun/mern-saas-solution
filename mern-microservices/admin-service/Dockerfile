# Use Node.js official image for build stage
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Node.js official image for runtime
FROM node:14
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5005
CMD ["node", "dist/index.js"]
