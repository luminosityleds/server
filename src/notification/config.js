// Import the 'dotenv' module to read values from the .env file
const dotenv = require('dotenv');

// Load values from .env file
dotenv.config();

// This config defines the production variables which are on the left side of the OR operator
// The development variables are on the right side of the OR operator
// ?? is the nullish coalescing operator 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
// IMPORTANT: These variables are only scoped for the account microservice

module.exports = {
  activemq: {
    brokerURL: process.env.ACTIVEMQ_BROKER_URL !== undefined ? process.env.ACTIVEMQ_BROKER_URL : 'tcp://127.0.0.1:61613',
    username: process.env.ACTIVEMQ_USERNAME !== undefined ? process.env.ACTIVEMQ_USERNAME : 'admin',
    password: process.env.ACTIVEMQ_PASSWORD !== undefined ? process.env.ACTIVEMQ_PASSWORD : 'admin',  
      // Add any other ActiveMQ configuration options here
  },  
};