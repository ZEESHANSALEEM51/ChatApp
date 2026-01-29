# Use Node.js 20 (required by mongoose 9+)
FROM node:20-alpine

# Create and set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose application port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
