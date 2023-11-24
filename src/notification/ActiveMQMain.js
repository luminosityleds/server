// ActiveMQMain.js
require('dotenv').config(); // Load environment variables from .env file

const MessageConsumer = require('./MessageConsumer');
const MessageProducer = require('./MessageProducer');
const MessageScheduler = require('./MessageScheduler');
const MessageDeleter = require('./MessageDeleter');

// Load ActiveMQ configuration from config.ts
const config = require('./config');

// Use the classes as needed
MessageConsumer.init(config.activemq);
MessageProducer.init(config.activemq);
MessageProducer.sendMessage("Hello, ActiveMQ!");

// Schedule a message for future delivery
MessageScheduler.scheduleMessage("Scheduled message", 5000)
  .then(messageID => console.log(`Message scheduled with ID: ${messageID}`));

// Optionally, use MessageDeleter to delete scheduled messages
// MessageDeleter.init(config.activemq);
// MessageDeleter.deleteMessage(messageID).then(result => console.log(result));