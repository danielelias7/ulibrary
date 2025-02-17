import { Request, Response } from 'express';
import { createUser } from '../services/userService';

// Create user function
const createUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const { user } = await createUser(firstName, lastName, email, password, role);
    return res.json({ user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};