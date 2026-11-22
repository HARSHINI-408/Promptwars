import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  category: { type: String, required: true, trim: true },
  type: { type: String, enum: ['Expense', 'Income'], required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: String, required: true },
  ownerId: { type: String, default: 'demo-user', index: true }
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
