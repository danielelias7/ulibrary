import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User, { IUser } from "../models/User";
import mongoose from 'mongoose';
import { createToken } from "../libs/jwt";

export const signUpUser = async (firstName: string, lastName: string, email: string, password: string, role: string) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: await User.encryptPassword(password),
    role
  });

  const savedUser = await newUser.save() as IUser & { _id: mongoose.Types.ObjectId };
  const token = await createToken({ id: savedUser._id.toString() });

  return { user: savedUser, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }) as IUser & { _id: mongoose.Types.ObjectId };

  if (!user) {
    throw new Error("User not found");
  }

  const matchPassword = await User.comparePassword(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid password");
  }

  const token = await createToken({ id: user._id.toString() });
  return { user, token };
};

export const logoutUser = () => {
  return { message: "Logout successfully" };
};
