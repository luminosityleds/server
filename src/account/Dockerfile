# Base image for account microservice.  This image uses amd64 as the architecture 
FROM amd64/node:16-bullseye

# Specifies root of file structure as working directory in docker image
WORKDIR /

# Copy files to root of file structure in docker image
COPY account.ts /
COPY config.ts /
COPY IUserSchema.ts /
COPY package.json /

# Install all dependencies to run account microservice
RUN npm install

# Exposes port 5000 which is the same port specified in the express app in account.ts
EXPOSE 5000

# run the command specified in the package.json to start the account microservice
CMD ["npm", "run", "account"]