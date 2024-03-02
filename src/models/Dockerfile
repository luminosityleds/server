FROM node:latest

WORKDIR /models

# Copies files from the models directory
COPY ["DeviceSchema.ts", "/models"]
COPY ["UserSchema.ts", "/models"]

RUN ["/bin/bash", "-c", "echo Models Image Built!"]
