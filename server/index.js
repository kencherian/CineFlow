import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 MongoDB Connection Successful!'))
  .catch((error) => console.error('🔴 MongoDB Connection Failed:', error));

// Basic API Route
app.get('/api/status', (req, res) => {
  res.json({ 
    message: "CineFlow API is up and running on Node.js/Express!", 
    status: "success" 
  });
});

app.listen(PORT, () => {
  console.log(`Server is actively running on http://localhost:${PORT}`);
});