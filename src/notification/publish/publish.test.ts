import mqtt, { MqttClient, IClientPublishOptions, PacketCallback } from 'mqtt';
import express from 'express';
import request from 'supertest';
import { connectToMongoDB } from './db';
import { log, error } from 'console';

// Mock modules
jest.mock('mqtt');
jest.mock('./db');

type MockMqttClient = Partial<{
  on: jest.Mock;
  publish: jest.Mock;
  end: jest.Mock;
}>;

// Helper function to create a mock MQTT client
const mockClient = (): MockMqttClient => {
  const client = {} as MockMqttClient;

  client.on = jest.fn();
  client.publish = jest.fn(
    (topic: string, message: string | Buffer, optsOrCallback?: IClientPublishOptions | PacketCallback, callback?: PacketCallback) => {
      if (typeof optsOrCallback === 'function') {
        optsOrCallback(); // Simulate success
      } else if (callback) {
        callback(); // Simulate success
      }
      return client as unknown as MqttClient;
    }
  );
  client.end = jest.fn((forceOrCallback?: boolean | (() => void), callback?: (() => void)) => {
    if (typeof forceOrCallback === 'boolean') {
      if (callback) callback(); // Simulate success if callback is provided
    } else if (typeof forceOrCallback === 'function') {
      forceOrCallback(); // Simulate success
    } else if (callback) {
      callback(); // Simulate success if only callback is provided
    }
    return client as unknown as MqttClient;
  });

  return client;
};

describe('Publish Service', () => {
  let app: express.Express;
  let server: any;
  const topic = 'test/topic';
  const options = {
    username: 'testUser',
    password: 'testPassword',
    clientId: 'testClient',
  };

  beforeAll(() => {
    app = express();

    (mqtt.connect as jest.Mock).mockReturnValue(mockClient());
    (connectToMongoDB as jest.Mock).mockResolvedValue(undefined);

    app.get('/publish/:id', async (req, res) => {
      const client: MqttClient = mqtt.connect('mqtt://test-broker', options);
      const event = {
        id: req.params.id,
        message: 'From Publish Service',
      };

      client.on('connect', () => {
        log('Broker connected');
        client.publish(topic, JSON.stringify(event), {}, (err) => {
          if (err) {
            error(`Error publishing message: ${err}`);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            client.end(); // Ensure the client is closed
            res.json(event);
          }
        });
      });

      client.on('error', (error: Error) => {
        log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    });

    // Start the server on a random port for testing
    server = app.listen(0);  // Start the server and save the instance
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll((done) => {
    // Close the server after all tests are finished
    server.close((err: any) => {
      if (err) {
        console.error("Error closing server:", err);
        done(err);
      } else {
        console.log("Server closed successfully.");
        done();
      }
    });
  });

  it('should publish a message and return the event object', async () => {
    const clientMock = mqtt.connect as jest.Mock;

    // Mock the client to ensure it is set up properly for each test case
    clientMock.mockReturnValueOnce({
      ...mockClient(),
      on: jest.fn((event, callback) => {
        if (event === 'connect') callback(); // Simulate successful connection
        return clientMock();
      }),
      publish: jest.fn((topic, message, optsOrCallback, callback) => {
        if (typeof optsOrCallback === 'function') {
          optsOrCallback(); // Simulate successful publish
        } else if (callback) {
          callback(); // Simulate successful publish
        }
        return clientMock();
      }),
    });

    const response = await request(app).get('/publish/12345');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '12345', message: 'From Publish Service' });

  }, 10000);

  it('should return 500 if publishing fails', async () => {
    const clientMock = mqtt.connect as jest.Mock;

    // Set up the mock to simulate a publish error
    clientMock.mockReturnValueOnce({
      ...mockClient(),
      on: jest.fn((event, callback) => {
        if (event === 'connect') callback(); // Simulate successful connection
        return clientMock();
      }),
      publish: jest.fn((topic, message, optsOrCallback, callback) => {
        if (typeof optsOrCallback === 'function') {
          optsOrCallback(new Error('Publish error')); // Simulate publish error
        } else if (callback) {
          callback(new Error('Publish error')); // Simulate publish error
        }
        return clientMock();
      }),
    });

    const response = await request(app).get('/publish/12345');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });

  }, 10000);
});
