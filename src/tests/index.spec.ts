import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('app', () => {
  it('should return a 400 response for GET /api/images/thumbnail', async () => {
    const response = await request.get('/api/images/thumbnail');
    expect(response.status).toBe(400);
  });

  it('should return a 200 response for GET /api/images?filename=example.jpeg&&width=200&&height=200', async () => {
    const response = await request.get('/api/images?filename=example.jpeg&&width=200&&height=200');
    expect(response.status).toBe(200);
  });

  it('should return a 400 response for GET /api/images?filename=example.jpeg&&width=200&&height=a', async () => {
    const response = await request.get('/api/images?filename=example.jpeg&&width=200&&height=a');
    expect(response.body.error).toBe('heigh and width must be numbers');
  });

  it('should return a 400 response for GET /api/images?filename=example.jpeg&&width=200&&height=a', async () => {
    const response = await request.get('/api/images?filename=example.jpeg&&width=200&&height=a');
    expect(response.body.error).toBe('heigh and width must be numbers');
  });
  // image should have width and height and filename shouldn't be empty

  it('should return a 400 response for GET /api/images?filename=example.jpeg&&width=200&&height=200', async () => {
    const response = await request.get('/api/images?filename=example.jpeg&&width=-100&&height=200');
    expect(response.body.error).toBe('image width and height must be positive');
  });
});
