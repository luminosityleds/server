# Base image for subscribe notification microservice.  This image uses amd64 as the architecture 
FROM node:18-bullseye

# Specifies app directory as working directory in docker image
WORKDIR /app

# Copy config files to app directory in docker image
COPY package.json /app/

# Install all dependencies to run subscribe notification microservice in silent mode
RUN npm install --silent

# Copy all other files to app directory in docker image
COPY . ./

# run the command specified in the package.json to start the subscribe notification microservice
CMD ["npm", "run", "subscribe"]