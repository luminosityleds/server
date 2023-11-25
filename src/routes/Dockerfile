FROM node:latest

WORKDIR /
COPY github.ts/
COPY routes.ts/
RUN npm install

# Port 4000 is the server port, 8080 is the cors-anywhere port
EXPOSE 4000 8080

# Runs the 
CMD ["npx", "ts-node", "routes.ts"]