import express, { Application } from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import loanRoutes from './routes/loanRoutes';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
dotenv.config();

const bcrypt = require('bcryptjs');
bcrypt.setRandomFallback((len: number) => {
  const buf = crypto.randomBytes(len);
  return buf;
});

const app: Application = express();
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

app.use(express.json()); // Enable parsing JSON request bodies

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
