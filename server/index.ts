import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import Search from './models/Search';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connections
const MONGODB_URI = process.env.MONGODB_URI as string;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🟢 MongoDB Connection Successful!'))
  .catch((error) => console.error('🔴 MongoDB Connection Failed:', error));

// Initialize Redis Client
const redisClient = createClient({ url: REDIS_URL });

redisClient.on('error', (err) => console.error('🔴 Redis Client Error:', err));
redisClient.on('connect', () => console.log('🟢 Redis Connection Successful!'));

// Connect Redis before starting the server
await redisClient.connect().catch(console.error);

// Basic API Route
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ 
    message: "CineFlow API is up and running!", 
    status: "success" 
  });
});

// --- SEARCH METRICS API ---

// 1. Log a new search or increment an existing one
app.post('/api/search', async (req: Request, res: Response): Promise<any> => {
  const { searchTerm } = req.body;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const searchDoc = await Search.findOneAndUpdate(
      { searchTerm: searchTerm.toLowerCase() },
      { $inc: { count: 1 } },
      { returnDocument: 'after', upsert: true }
    );
    
    // Invalidate the trending cache whenever new data is added
    await redisClient.del('trending_searches');
    
    return res.status(200).json(searchDoc);
  } catch (error) {
    console.error("Error logging search:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Get top 5 trending searches (WITH REDIS CACHING)
app.get('/api/trending', async (req: Request, res: Response): Promise<any> => {
  try {
    // Check if the data exists in Redis first
    const cachedTrending = await redisClient.get('trending_searches');
    
    if (cachedTrending) {
      console.log('⚡ Serving from Redis Cache');
      return res.status(200).json(JSON.parse(cachedTrending));
    }

    console.log('🐢 Serving from MongoDB');
    const trendingSearches = await Search.find()
      .sort({ count: -1 })
      .limit(5);
      
    // Store the result in Redis with a TTL of 300 seconds (5 minutes)
    await redisClient.setEx('trending_searches', 300, JSON.stringify(trendingSearches));
      
    return res.status(200).json(trendingSearches);
  } catch (error) {
    console.error("Error fetching trending searches:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is actively running on http://localhost:${PORT}`);
});