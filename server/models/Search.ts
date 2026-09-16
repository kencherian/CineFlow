import mongoose, { Schema, Document } from 'mongoose';

export interface ISearch extends Document {
  searchTerm: string;
  score: number;
  lastUpdatedAt: Date;
}

const searchSchema = new Schema<ISearch>(
  {
    searchTerm: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      default: 1,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISearch>('Search', searchSchema);