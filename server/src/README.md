## Info
This directory contains the server (backend) of luminosityleds.  The backend allows users to, but not limited to:
- Connect to the MongoDB database
- Use routes to connect to different parts of the backend
- Use a schema for MongoDB

### How to run the server (backend)
1. `cd server`
2. Get MongoDB credentials from Aaron or Jason
- Note: This is used to access the database
3. Copy the credentials as environment varialbes in your terminal
4. `npm run serverStart` to start the server

## Files to note
### routes/routes.ts
This file contains the routes for the backend.  This handles the logic from requests such as the React frontend.  For example, you can use a route to register a user.

### models/UserSchema.ts
This file contains the schema for users to be registered in MongoDB. The schema requires users to have an email and name.  Devices can also be associated with a user.

### server.ts
This file runs the server (backend).