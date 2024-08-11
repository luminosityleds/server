import mqtt, { MqttClient } from 'mqtt';
import request from 'supertest';
import express from 'express';
import { connectToMongoDB } from './db';

jest.mock('mqtt');
jest.mock('./db');

const mockClient = (): Partial<MqttClient> => {
  const client: Partial<MqttClient> = {
    on: jest.fn(),
    subscribe: jest.fn((topic: string | string[], optsOrCallback?: any, callback?: any) => {
      if (typeof optsOrCallback === 'function') {
        optsOrCallback(null, []); // Simulate success
      } else if (typeof callback === 'function') {
        callback(null, []); // Simulate success
      }
      return {} as MqttClient;
    }),
    end: jest.fn(),
  };

  return client;
};

describe('Subscribe Service', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    
    const subscribeRouter = express.Router();

    subscribeRouter.get('/status', (req, res) => {
      res.status(200).json({ message: 'Subscriber is running' });
    });

    app.use('/subscribe', subscribeRouter);

    const client = mockClient();
    (mqtt.connect as jest.Mock).mockReturnValue(client);
    (connectToMongoDB as jest.Mock).mockResolvedValue(undefined);

    // Set up the event handler mock
    const connectMock = mqtt.connect as jest.Mock;
    const mockClientInstance = connectMock.mock.results[0]?.value as Partial<MqttClient>;

    if (mockClientInstance) {
      (mockClientInstance.on as jest.Mock).mockImplementation((event: string, handler: (...args: any[]) => void) => {
        if (event === 'message') {
          // Directly call the handler with test data
          handler('test-topic', Buffer.from('test-message'));
        }
        return mockClientInstance as MqttClient;
      });
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and a status message when /subscribe/status is called', async () => {
    const response = await request(app).get('/subscribe/status');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Subscriber is running' });
  });

  it('should log messages received from the broker', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock implementation to avoid actual logging

    // Simulate message reception
    const connectMock = mqtt.connect as jest.Mock;
    const mockClientInstance = connectMock.mock.results[0]?.value as Partial<MqttClient>;

    if (mockClientInstance && mockClientInstance.on) {
      const messageHandler = (mockClientInstance.on as jest.Mock).mock.calls.find(([event]) => event === 'message')?.[1];
      if (messageHandler) {
        messageHandler('test-topic', Buffer.from('test-message'));
      }
    }

    // Debugging: Output the actual calls to `console.log`
    console.log('logSpy calls:', logSpy.mock.calls); // Log all calls to console.log for inspection

    // Flatten the logged calls for easier inspection
    const actualCalls = logSpy.mock.calls.map(call => call[0]);
    console.log('Actual calls to console.log:', actualCalls); // Print actual calls for debugging

    // Check if expected message is among the logged calls
    const expectedMessage = 'Received message from topic test-topic: test-message';
    expect(actualCalls).toContain(expectedMessage); // Check if expected message is among the logged calls
    
    logSpy.mockRestore(); // Restore original implementation after test
  });
});
