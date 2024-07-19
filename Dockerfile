# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "dev"]
