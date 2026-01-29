# Use Node.js LTS
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Expose the port (Back4App uses PORT env variable)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
