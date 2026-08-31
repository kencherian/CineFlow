import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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