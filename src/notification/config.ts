// This config defines the production variables which are on the left side of the OR operator
// The development variables are on the right side of the OR operator
// ?? is the nullish coalescing operator 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
// IMPORTANT: These variables are only scoped for the account microservice

export default {
    rabbitmq: {
      hostname: 'localhost', // RabbitMQ server hostname
      port: 5672, // Default RabbitMQ port
      username: process.env.RABBITMQ_USERNAME ?? "", // RabbitMQ username
      password: process.env.RABBITMQ_PASSWORD ?? "", // RabbitMQ password
      vhost: '/', // Virtual host (default is '/')
      heartbeat: 10, // Heartbeat interval in seconds
    },
  };