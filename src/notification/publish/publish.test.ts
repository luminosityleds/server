import mqtt, { MqttClient, IClientPublishOptions, PacketCallback, DoneCallback } from 'mqtt';
import express from 'express';
import request from 'supertest';
import { connectToMongoDB } from './db';
import { log, error } from "console";

jest.mock('mqtt');
jest.mock('./db');

// Helper type to mock all possible overloads
type MockMqttClient = Partial<{
  on: jest.Mock;
  publish: jest.Mock;
  end: jest.Mock;
}>;

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
      return client as unknown as MqttClient; // Ensure it matches the return type
    }
  );

  client.end = jest.fn(
    (forceOrCallback?: boolean | (() => void), callback?: (() => void)) => {
      if (typeof forceOrCallback === 'boolean') {
        if (callback) callback(); // Simulate success if callback is provided
      } else if (typeof forceOrCallback === 'function') {
        forceOrCallback(); // Simulate success
      } else if (callback) {
        callback(); // Simulate success if only callback is provided
      }
      return client as unknown as MqttClient; // Ensure it matches the return type
    }
  );

  return client;
};

describe('Publish Service', () => {
  let app: express.Express;
  const topic = 'test/topic';
  const options = {
    username: 'testUser',
    password: 'testPassword',
    clientId: 'testClient',
  };

  beforeEach(() => {
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
            client.end();
            res.json(event);
          }
        });
      });

      client.on('error', (error: Error) => {
        log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should publish a message and return the event object', async () => {
    const response = await request(app).get('/publish/12345');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '12345', message: 'From Publish Service' });
    expect(mqtt.connect).toHaveBeenCalledTimes(1);
  }, 10000);

  it('should return 500 if publishing fails', async () => {
    (mqtt.connect as jest.Mock).mockReturnValue({
      ...mockClient(),
      publish: jest.fn((topic, message, optsOrCallback, callback) => {
        if (typeof optsOrCallback === 'function') {
          optsOrCallback(new Error('Publish error'));
        } else if (callback) {
          callback(new Error('Publish error'));
        }
        return {} as MqttClient;
      }),
    });

    const response = await request(app).get('/publish/12345');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  }, 5000);
});
