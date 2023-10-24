FROM node:16-bullseye
WORKDIR /
RUN npm install -g express
COPY account.ts /
RUN ["node", "account.ts"]
EXPOSE 3001