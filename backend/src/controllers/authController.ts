import { Request, Response } from 'express';
import { signUpUser, loginUser, logoutUser } from '../services/authService';

// Sign up function
const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const { user, token } = await signUpUser(firstName, lastName, email, password, role);
    res.cookie('token', token, { httpOnly: true, maxAge: 7200000 });
    return res.json({ user, token });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login function
const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.cookie('token', token, { httpOnly: true, maxAge: 7200000 });
    return res.json({ user, token });
  } catch (error: any) {
    console.error(error);
    if (error.message === "User not found" || error.message === "Invalid password") {
      return res.status(400).json({ token: null, message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout function
const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    res.clearCookie('token');
    const response = logoutUser();
    return res.json(response);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export {
  signup,
  login,
  logout
};
