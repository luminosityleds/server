import * as amqplib from 'amqplib';

// Define type references for Connection and Channel
type Connection = amqplib.Connection;
type Channel = amqplib.Channel;

async function connectToRabbitMQ() 
{
  try 
  {
    // Replace 'username' and 'password' with your RabbitMQ credentials
    const connection: Connection = await amqplib.connect
    (
        'amqp://luminosityleds:Lumi-123@localhost:5672'
    );

    // Channel for communication
    const channel: Channel = await connection.createChannel();

    // We can use the 'channel' to perform various RabbitMQ operations

    // Publish a message to a queue
    const queueName = 'myQueue';
    await channel.assertQueue(queueName);
    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(queueName, Buffer.from(message));

    // Consume messages from a queue
    await channel.consume(queueName, (msg) => 
    {
      if (msg !== null) {
        console.log('Received message:', msg.content.toString());
        // Acknowledge the message
        channel.ack(msg);
      }
    });

    // Close the channel and the connection when done
    await channel.close();
    await connection.close();
  } 

  catch (error) // Incase of an error
  {
    console.error('Error connecting to RabbitMQ:', error);
  }

}

// Call the function to connect to RabbitMQ
connectToRabbitMQ();