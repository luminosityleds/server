FROM node:latest

WORKDIR /routes

# Copies files from the routes directory
COPY ["github.ts", "google.ts", "routes.ts", "/routes"]
COPY ["package.json", "/routes"]

# Runs npm install using bash shell
RUN ["/bin/bash", "-c", "npm install"]

# Port 4000 is the server port, 8080 is the cors-anywhere port
EXPOSE 4000 5000 8080

CMD ["npx", "ts-node", "github.ts", "google.ts"]