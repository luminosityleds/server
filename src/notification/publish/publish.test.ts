import request from 'supertest';
import server from './publish' // Import your Express app

describe('Publish Service', () => {
  it('should return the expected response for /publish/:id', async () => {
    const response = await request(server).get('/publish/3');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '3', message: 'From Publish Service' });
  });
});