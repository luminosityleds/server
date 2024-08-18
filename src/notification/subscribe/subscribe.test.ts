import mqtt, { MqttClient } from 'mqtt';
import request from 'supertest';
import express from 'express';
import { connectToMongoDB } from './db';
import { log } from "console";

jest.mock('mqtt');
jest.mock('./db');

// Helper function to create a mock MQTT client
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

    // Ensure the MQTT client code is initialized
    // Require or invoke the module that initializes the MQTT client
    // For example:
    // require('./path/to/your/mqtt-setup'); // Adjust path as needed

    // Debugging: Check the number of connectMock calls
    const connectMock = mqtt.connect as jest.Mock;
    log('connectMock call count:', connectMock.mock.calls.length); // Debugging: Check the number of connect calls

    const mockClientInstance = connectMock.mock.results[0]?.value as Partial<MqttClient>;

    if (mockClientInstance) {
      (mockClientInstance.on as jest.Mock).mockImplementation((event: string, handler: (...args: any[]) => void) => {
        if (event === 'message') {
          log('Mock on handler triggered'); // Debugging: Check if this line is executed
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
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Ensure the MQTT client is set up and used
    const connectMock = mqtt.connect as jest.Mock;
    log('connectMock call count:', connectMock.mock.calls.length); // Debugging: Check the number of connect calls

    const mockClientInstance = connectMock.mock.results[0]?.value as Partial<MqttClient>;

    if (mockClientInstance && mockClientInstance.on) {
      log('mockClientInstance.on:', mockClientInstance.on); // Debugging: Check the on method

      const messageHandler = (mockClientInstance.on as jest.Mock).mock.calls.find(([event]) => event === 'message')?.[1];
      if (messageHandler) {
        messageHandler('test-topic', Buffer.from('test-message'));
      }
    }

    const expectedMessage = 'Received message from topic test-topic: test-message';
    const actualCalls = logSpy.mock.calls.map((call: any[]) => call.join(' '));

    log('Actual calls to log:', actualCalls); // Debugging output
    expect(actualCalls).toContain(expectedMessage);

    logSpy.mockRestore();
  });
});
