// Import the necessary modules
import * as amqplib from 'amqplib';

async function connectToRabbitMQ() {
  try {

    // Replace 'username' and 'password' with your RabbitMQ credentials
    const connection: amqplib.Connection = await amqplib.connect(
      'amqp://luminosityleds:Lumi-123@localhost:5672'
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
