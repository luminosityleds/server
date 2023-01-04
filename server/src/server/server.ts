const express = require('express')
const app = express()
const mongoose = require('mongoose')
const URLroutes = require('../routes/routes')

const USR = process.env.MONGO_INITDB_ROOT_USERNAME;
const PSW = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB = process.env.MONGO_INITDB_DATABASE;

mongoose.connect(`mongodb+srv://${USR}:${PSW}@${DB}.cgornhw.mongodb.net/test`, () => console.log('Database is connected'));
console.log('test')