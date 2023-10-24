# Account Microservice
The scope of this microservice is defined in the following [epic](https://luminosity-led.atlassian.net/browse/LL-2).

## account.ts
This program defines the account microservice.  The microservice uses an isolated express app which exposes the following routes.

### POST register
This route will register a new user in the MongoDB database.

## config.ts
This file defines the development and environment variables for the account microservice.

## IUserSchema.ts
This interface defines the structure of any object that uses the interface.  It corresponds the data that will get entered into the MongoDB database.

## package.json
This file defines the name, version, description, scripts, and dependencies of the account microservice.

### Development Scripts
Uses `nodemon` which restarts the service whenever there is a change made to `account.ts`.
#### How to Run
```bash
npm run devAccount
```

### Production Scripts
Uses `ts-node` which precompiles `account.ts` TypeScript code that can be run in a terminal.
#### How to Run
```bash
npm run account
```

## Dockerfile
Defines how the docker images for the account microservice will be created.
### How to Build Docker Image
```bash
docker build -t account:VERSION .
```
VERSION = the version of the account microservice
**Run the above command from the root of the src/account directory.**
### How to Run Docker Container
```bash
docker run --rm -t -e USR=USR -e PSW=PSW -e CLUS=CLUS -e DB=DB -e COL=COL --network="host" --dns=8.8.8.8 account
```
USR = username for MongoDB

PSW = password for MongoDB

CLUS = cluster for MongoDB

DB = database for MongoDB

COL = collection for MongoDB

network means tell docker container to use localhost

dns means tell docker container to use google's public DNS

**Run the above command from anywhere.**