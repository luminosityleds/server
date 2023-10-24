FROM amd64/node:16-bullseye
WORKDIR /
COPY account.ts /
COPY config.ts /
COPY IUserSchema.ts /
COPY package.json /

RUN npm install

EXPOSE 5000
CMD ["npm", "run", "account"]