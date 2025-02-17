import Book, { IBook } from '../models/Book';

export const addBook = async (title: string, author: string, publishedYear: number, genre: string, stock: number): Promise<IBook> => {

  const existingBook = await Book.findOne({ title });
  if (existingBook) {
    throw new Error("Book with the same title already exists");
  }

  const newBook = new Book({
    title,
    author,
    publishedYear,
    genre,
    stock
  });
  return await newBook.save();
};

export const getBooks = async (query: any): Promise<IBook[]> => {
  const filters: any = {};
  if (query.title) {
    filters.title = { $regex: query.title, $options: 'i' };
  }
  if (query.author) {
    filters.author = { $regex: query.author, $options: 'i' };
  }
  if (query.genre) {
    filters.genre = { $regex: query.genre, $options: 'i' };
  }
  return await Book.find(filters);
};

export const getBookById = async (id: string): Promise<IBook | null> => {
  return await Book.findById(id);
};

export const updateBookStock = async (id: string, change: number): Promise<IBook | null> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  book.stock += change;
  return await book.save();
};
