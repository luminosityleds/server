import request from 'supertest';
import server from './publish'; // Import your Express app

// Mock the mqtt library
jest.mock('mqtt', () => ({
  connect: jest.fn(() => ({
    on: jest.fn(),
    publish: jest.fn(),
    end: jest.fn(),
  })),
}));

describe('Publish Service', () => {
  it(
    'should return the expected response for /publish/:id',
    async () => {
      const response = await request(server).get('/publish/3');

      // Check if the server returns a 200 status code
      expect(response.status).toBe(200);

      // Check if the response body matches the expected format
      expect(response.body).toEqual({ id: '3', message: 'From Publish Service' });
    },
    // Set the timeout to 20 seconds
    20000
  );
});
