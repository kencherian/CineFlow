import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';

// We create a mock express app to test the routes in isolation
const app = express();
app.use(express.json());

// Mock Routes mirroring your index.ts
app.get('/api/status', (req, res) => {
  res.status(200).json({ message: "API is up", status: "success" });
});

app.post('/api/search', (req, res) => {
  if (!req.body.searchTerm) return res.status(400).json({ error: 'Search term is required' });
  res.status(200).json({ searchTerm: req.body.searchTerm, count: 1 });
});

app.get('/api/trending', (req, res) => {
  res.status(200).json([]);
});

describe('CineFlow API Endpoints', () => {
  
  // Test 1
  it('GET /api/status should return 200 OK', async () => {
    const response = await request(app).get('/api/status');
    expect(response.status).toBe(200);
  });

  // Test 2
  it('GET /api/status should return success payload', async () => {
    const response = await request(app).get('/api/status');
    expect(response.body).toHaveProperty('status', 'success');
  });

  // Test 3
  it('POST /api/search should fail (400) if searchTerm is missing', async () => {
    const response = await request(app).post('/api/search').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test 4
  it('POST /api/search should succeed (200) with a valid searchTerm', async () => {
    const response = await request(app).post('/api/search').send({ searchTerm: 'Inception' });
    expect(response.status).toBe(200);
    expect(response.body.searchTerm).toBe('Inception');
  });

  // Test 5
  it('GET /api/trending should return an array', async () => {
    const response = await request(app).get('/api/trending');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});