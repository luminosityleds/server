# Base image for publish notification microservice.  This image uses amd64 as the architecture 
FROM amd64/node:18-bullseye

# Specifies app directory as working directory in docker image
WORKDIR /app

# Exposes port 4000 which is the same port specified in the express app in publish.ts
EXPOSE 4000

# Copy config files to app directory in docker image
COPY package.json /app/

# Install all dependencies to run publish notification microservice in silent mode
RUN npm install --silent

# Copy all other files to app directory in docker image
COPY . ./

# run the command specified in the package.json to start the publish notification microservice
CMD ["npm", "run", "publish"]