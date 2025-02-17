import { Request, Response } from 'express';
import { requestCheckout, getLoansByUser, returnBook } from '../services/loanService';
import mongoose from 'mongoose';

export const checkoutBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { bookId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const loan = await requestCheckout(userId, new mongoose.Types.ObjectId(bookId));

    return res.json(loan);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Book not found") {
      return res.status(404).json({ message: "Book not found" });
    }
    
    if (error.message === "Book out of stock") {
      return res.status(400).json({ message: "Book out of stock" });
    }

    if (error.message === "Book already checked out by the user") {
      return res.status(400).json({ message: "Book already checked out by the user" });
    }
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserLoans = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const loans = await getLoansByUser(userId);
    return res.json(loans);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const returnUserBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { loanId } = req.body;
    const userId = req.user?._id;

    if (!loanId) {
      return res.status(400).json({ message: "Loan ID is required" });
    }

    const loan = await returnBook(userId, new mongoose.Types.ObjectId(loanId));
    return res.json(loan);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Loan not found") {
      return res.status(404).json({ message: "Loan not found" });
    }
    if (error.message === "Unauthorized: This loan does not belong to the user") {
      return res.status(401).json({ message: "Unauthorized: This loan does not belong to the user" });
    }
    if (error.message === "Book already returned") {
      return res.status(400).json({ message: "Book already returned" });
    }
    if(error.message === "Book not found") {
      return res.status(404).json({ message: "Book not found" });
    }   

    return res.status(500).json({ message: "Internal server error" });
  }
};