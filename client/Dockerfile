FROM node:latest
WORKDIR /client
COPY ["package.json", "package-lock.json*", "tsconfig.json*", "/client"]
COPY ["src", "/client/src"]
COPY ["public", "/client/public"]
RUN ["/bin/bash", "-c", "npm install"]
EXPOSE 3000