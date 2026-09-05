import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  searchTerm: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate entries for the same movie search
  },
  count: {
    type: Number,
    default: 1, // Every new search starts with a count of 1
  }
}, { timestamps: true });

export default mongoose.model('Search', searchSchema);