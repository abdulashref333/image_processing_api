import supertest from 'supertest';
import app from '../index';

// const request = supertest(app);
describe('app', () => {
  it('should return a 404 response for GET /api/images/thumbnail', async () => {
    const response = await supertest(app).get('/api/images/thumbnail');
    expect(response.status).toBe(404);
  });

  it('should return a 200 response for GET /api/images?filename=example.jpeg&&width=200&&height=200', async () => {
    const response = await supertest(app).get('/api/images?filename=example.jpeg&&width=200&&height=200');
    expect(response.status).toBe(200);
  });
});
