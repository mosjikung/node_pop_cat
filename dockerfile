# Use the official Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install the required dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install PostgreSQL client (needed for pg library)
RUN apt-get update && apt-get install -y postgresql-client

# Copy your Node.js application files to the container
COPY . .

# Expose the port that your Node.js application listens on
EXPOSE 3000

# Define the command to run your Node.js application
CMD ["node", "app.js"]
