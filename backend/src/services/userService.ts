import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

export const createUser = async (firstName: string, lastName: string, email: string, password: string, role: string) => {
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: await User.encryptPassword(password),
    role
  });

  const savedUser = await newUser.save() as IUser & { _id: mongoose.Types.ObjectId };

  return { user: savedUser };
};