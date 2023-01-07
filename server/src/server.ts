const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routeURLs = require('./routes/routes')
const cors = require('cors')

const USR = process.env.MONGO_INITDB_ROOT_USERNAME;
const PSW = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB = process.env.MONGO_INITDB_DATABASE;

mongoose.connect(`mongodb+srv://${USR}:${PSW}@${DB}.cgornhw.mongodb.net/Luminosity`, () => console.log('Database is connected'));

app.use(express.json())
app.use(cors())
app.use('/app', routeURLs)
app.listen(4000, () => console.log("server is up and running"))