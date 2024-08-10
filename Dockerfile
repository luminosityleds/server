FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json*", "tsconfig.json*", "/app/"]
COPY ["src", "/app/src"]
RUN ["/bin/bash", "-c", "npm install"]
EXPOSE 4000