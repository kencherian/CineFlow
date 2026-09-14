import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Search from './models/Search';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🟢 MongoDB Connection Successful!'))
  .catch((error) => console.error('🔴 MongoDB Connection Failed:', error));

// Basic API Route
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ 
    message: "CineFlow API is up and running on Node.js/Express!", 
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
    // Check if the term already exists. If it does, increment count by 1. If not, create it.
    const searchDoc = await Search.findOneAndUpdate(
      { searchTerm: searchTerm.toLowerCase() },
      { $inc: { count: 1 } },
      { returnDocument: 'after', upsert: true } // <-- UPDATED HERE to fix deprecation warning
    );
    
    return res.status(200).json(searchDoc);
  } catch (error) {
    console.error("Error logging search:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Get top 5 trending searches
app.get('/api/trending', async (req: Request, res: Response): Promise<any> => {
  try {
    const trendingSearches = await Search.find()
      .sort({ count: -1 }) // Sort by count in descending order
      .limit(5); // Only get the top 5
      
    return res.status(200).json(trendingSearches);
  } catch (error) {
    console.error("Error fetching trending searches:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is actively running on http://localhost:${PORT}`);
});