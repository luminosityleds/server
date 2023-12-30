# Notification Service
The scope of this microservice is defined in the following [epic]().

## publish.ts
This program defines the publish notification service.

## subscribe.ts
This program defines the subscribe notification service.

## config.ts
This file defines the environment variables and initalized variables with blank values for the account microservice.

## package.json (Separate for publish and subscribe services)
These files define the names, versions, descriptions, scripts, and dependencies of the publish and subscribe services.

## package-lock.json (Separate for publish and subscribe services)
Records the exact version of every installed dependency, including its sub-dependencies and their versions.

## .gitignore
Ensures that certain files not tracked by Git remain untracked.

### Development/Production Scripts
Uses `npx ts-node` which precompiles `publish.ts` and `subscribe.ts` TypeScript code that can then be run.

## Dockerfile
Defines how the docker images for the notification service will be created.

#### How to Run
```bash
1. Open VSCode and Docker Desktop

2. Be in the LL-238 directory (or the master if the ticket is already pushed) and then cd into the src/notification directory
   where are the files are located

3. Run -> docker compose up --build

4. Go to http://localhost:4000/publish/3

5. Should see {"id":"3","message":"From Publish Service"}
```
