const request = require('supertest');
const express = require('express');
const { router } = require('./__mocks__/routes.mock');

const app = express();
app.use(express.json());
app.use(router);

describe('API Routes', () => {
  it('health check endpoint returns 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
  });

  // Add more test cases for your API routes
  it('returns 404 for non-existent route', async () => {
    const response = await request(app).get('/api/non-existent');
    expect(response.status).toBe(404);
  });

  // Example:
  // it('returns 401 for unauthorized access', async () => {
  //   const response = await request(app).get('/api/protected-route');
  //   expect(response.status).toBe(401);
  // });
}); 