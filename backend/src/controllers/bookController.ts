import { Request, Response } from 'express';
import { addBook, getBooks, getBookById, updateBookStock } from '../services/bookService';

const AddNew = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, author, publishedYear, genre, stock } = req.body;
    const book = await addBook(title, author, publishedYear, genre, stock);
    return res.json(book);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const books = await getBooks(req.query);
    return res.json(books);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json(book);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkoutBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updatedBook = await updateBookStock(id, -1);
    return res.json(updatedBook);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const returnBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updatedBook = await updateBookStock(id, 1);
    return res.json(updatedBook);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  AddNew,
  getAll,
  getById,
  checkoutBook,
  returnBook
};
