import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  stock: number;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  genre: { type: String, required: true },
  stock: { type: Number, required: true }
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
