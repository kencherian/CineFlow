import mongoose, { Schema, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ISearch extends Document {
  searchTerm: string;
  count: number;
}

// 2. Bind the interface to the Schema.
const searchSchema = new Schema<ISearch>({
  searchTerm: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

export default mongoose.model<ISearch>('Search', searchSchema);