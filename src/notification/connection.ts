// Import the necessary modules
import * as amqplib from 'amqplib';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Access the environment variables
const rabbitMqUsername = process.env.RABBITMQ_USERNAME;
const rabbitMqPassword = process.env.RABBITMQ_PASSWORD;

async function connectToRabbitMQ() {
  try {

    // Replace 'username' and 'password' with your RabbitMQ credentials
    const connection: amqplib.Connection = await amqplib.connect(
      `amqp://${rabbitMqUsername}:${rabbitMqPassword}@localhost:5672`,
      {
        heartbeat: 10,
      }
    );

    // Channel for communication
    const channel: amqplib.Channel = await connection.createChannel();

    // Publish a message to a queue
    const queueName = 'myQueue';
    await channel.assertQueue(queueName);
    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(queueName, Buffer.from(message));

    // Function to send some messages before consuming the queue
    const sendMessages = (channel: amqplib.Channel) => {
      for (let i = 0; i < 10; i++) {
        channel.sendToQueue('myQueue', Buffer.from(`message ${i}`));
      }
    }

    // Send some messages to the queue
    sendMessages(channel);

    // Consume messages from a queue
    const consumer = (channel: amqplib.Channel) => (msg: amqplib.ConsumeMessage | null): void => {
      if (msg !== null) {
        console.log('Received message:', msg.content.toString());
        // Acknowledge the message
        channel.ack(msg);
      }
    };

    // Close the channel and the connection when done
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

// Call the function to connect to RabbitMQ
connectToRabbitMQ();
