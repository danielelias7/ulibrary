import mongoose, { Schema } from 'mongoose';

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  stock: number;
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  genre: { type: String, required: true },
  stock: { type: Number, default: 0 }, // Initialize stock to 0
});

export default mongoose.model<Book>('Book', bookSchema);