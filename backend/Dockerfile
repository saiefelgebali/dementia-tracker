# Create an image based on the official Node 14 Slim image from the dockerhub
FROM node:14-slim

# Create and use a directory where our app will be placed
WORKDIR /user/src/app

# Copy this directory into the workdir
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 to be used for the app
EXPOSE 3000

# Start the app
CMD ["npm","start"]