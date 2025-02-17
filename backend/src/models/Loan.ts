import mongoose, { Schema, Document } from 'mongoose';

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  checkoutDate: Date;
  returnDate: Date | null;
}

const loanSchema = new Schema<ILoan>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  checkoutDate: { type: Date, required: true, default: Date.now },
  returnDate: { type: Date, default: null }
});

const Loan = mongoose.model<ILoan>('Loan', loanSchema);

export default Loan;
