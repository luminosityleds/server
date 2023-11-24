'use strict';

const Stomp = require('stomp-client');

class MessageConsumer 
{
  constructor() 
  {
    this.stompClient = null;
    this.connectToActiveMQ = this.connectToActiveMQ.bind(this); // Bind the method to the class instance
  }

  init() 
  {
    this.connectToActiveMQ();
  }

  connectToActiveMQ() {
    const username = process.env.ACTIVEMQ_USERNAME || 'admin';
    const password = process.env.ACTIVEMQ_PASSWORD || 'admin';
    const host = '127.0.0.1';
    const port = 61613;
  
    const stompClient = new Stomp(host, port, username, password);
  
    stompClient.on('connecting', (info) => {
      console.log('Connecting to ActiveMQ...');
      console.log('Info:', info);
    });
  
    stompClient.on('connect', (sessionId) => {
      console.log('Connected to ActiveMQ with sessionId:', sessionId);
      this.stompClient = stompClient;
  
      // Check if the client is fully connected before subscribing
      console.log('Is the client fully connected?', this.stompClient && this.stompClient.connected);
  
      if (this.stompClient && this.stompClient.connected) {
        console.log('Subscribing to queue...');
        this.subscribeToQueue();
      } else {
        console.error('Stomp client is not fully connected.');
        console.log('Retrying connection in 5 seconds...');
        setTimeout(() => {
          this.connectToActiveMQ();
        }, 5000);
      }
    });
  
    stompClient.on('close', (statusCode, headers) => {
      console.log(`Stomp client closed with status code ${statusCode}`);
      console.log('Headers:', headers);
      // Handle close event here (e.g., log the disconnection)
      console.log('Retrying connection in 5 seconds...');
      setTimeout(() => {
        this.connectToActiveMQ();
      }, 5000);
    });
  
    stompClient.on('error', (error) => {
      console.error('Stomp client encountered an error:', error.message);
      // Handle the error as needed (e.g., log it)
      console.log('Retrying connection in 5 seconds...');
      setTimeout(() => {
        this.connectToActiveMQ();
      }, 5000);

      stompClient.on('connecting', (info) => {
        console.log('Connecting to ActiveMQ...');
        console.log('Info:', info);
        console.log('Is the client connected?', stompClient && stompClient.connected);
      });
      
    });
  
    stompClient.connect();
  }
  

  subscribeToQueue() 
  {
    if (!this.stompClient) {
      console.error('Stomp client is not connected');
      return;
    }

    this.stompClient.subscribe('/queue/queue1', (body, headers) => 
    {
      console.log('Received message:', body);
      // Add your processing logic for the received message here
    });
  }
}

// Create an instance of MessageConsumer
const messageConsumer = new MessageConsumer();

// Call the init method to start the connection
messageConsumer.init();

// Export the instance if needed
module.exports = messageConsumer;