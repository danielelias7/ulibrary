import Loan, { ILoan } from '../models/Loan';
import Book from '../models/Book';
import mongoose from 'mongoose';

export const requestCheckout = async (userId: mongoose.Types.ObjectId, bookId: mongoose.Types.ObjectId): Promise<ILoan> => {

  if (!bookId) {
    throw new Error("Book ID is required");
  }

  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.stock <= 0) {
    throw new Error("Book out of stock");
  }

  //check if the user has already checked out the book
  const existingLoan = await Loan.findOne({ userId, bookId, returnDate: null });
  if (existingLoan) {
    throw new Error("Book already checked out by the user");
  }

  //decrement the stock of the book
  book.stock -= 1;
  await book.save();

  const newLoan = new Loan({
    userId,
    bookId
  });
  return await newLoan.save();
};

export const getLoansByUser = async (userId: mongoose.Types.ObjectId): Promise<ILoan[]> => {
  return await Loan.find({ userId, returnDate: null }).populate('bookId');
};

export const returnBook = async (userId: mongoose.Types.ObjectId, loanId: mongoose.Types.ObjectId): Promise<ILoan | null> => {
  if (!loanId) {
    throw new Error("Loan ID is required");
  }

  const loan = await Loan.findById(loanId);
  if (!loan) {
    throw new Error("Loan not found");
  }

  if (!loan.userId.equals(userId)) {
    throw new Error("Unauthorized: This loan does not belong to the user");
  }

  if (loan.returnDate !== null) {
    throw new Error("Book already returned");
  }

  const book = await Book.findById(loan.bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  book.stock += 1;
  await book.save();

  loan.returnDate = new Date();
  return await loan.save();
};