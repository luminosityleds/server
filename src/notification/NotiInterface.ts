//Notification Interface variables

export interface RabbitMQServiceConfig {
    host: string; // RabbitMQ server host
    port: number; // RabbitMQ server port
    username: string; // RabbitMQ username
    password: string; // RabbitMQ password
    exchange: string; // RabbitMQ exchange
    queue: string; // RabbitMQ queue
    routingKey: string; // RabbitMQ routing key
  }
  
  export interface RabbitMQMessage {
    content: string; // Message content
    timestamp: number; // Timestamp of the message
  }