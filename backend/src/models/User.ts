import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'librarian';
  password: string;
}

interface IUserModel extends Model<IUser> {
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, receivedPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'librarian'], required: true },
  password: { type: String, required: true }
});

userSchema.statics.encryptPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async function (password: string, receivedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, receivedPassword);
}

userSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
}

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;