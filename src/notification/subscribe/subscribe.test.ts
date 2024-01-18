// subscribe.test.ts
import { options, topic, client, message } from './subscribe'; // Adjust the import path based on your project structure

describe('ActiveMQ Subscribe Functionality', () => {
  beforeAll((done) => {
    // Wait for the client to connect before running tests
    client.on('connect', () => {
      done();
    });
  });

  afterAll(() => {
    // Close the client connection after all tests are done
    client.end();
  });

  test('should subscribe to the specified topic', (done) => {
    // Make sure the client is subscribed to the correct topic
    client.subscribe(topic, (err) => {
      expect(err).toBeNull();
      done();
    });
  });

  test('should receive a message on the subscribed topic', (done) => {
    // Simulate a message being sent to the subscribed topic
    const testMessage = 'Test message';
    client.publish(topic, testMessage);

    // Since 'publish' triggers 'message' event, check if the message variable in your subscribe.ts file is updated
    setTimeout(() => {
      expect(message).toEqual(testMessage);
      done();
    }, 1000); // Adjust the timeout based on your needs
  });
  
  // Add more tests as needed for your specific use case

});