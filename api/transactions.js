import { connectDatabase } from './lib/db.js';
import Transaction from './models/Transaction.js';

export default async function handler(request, response) {
  if (!['GET', 'POST'].includes(request.method)) {
    response.setHeader('Allow', 'GET, POST');
    return response.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    if (request.method === 'GET') {
      const items = await Transaction.find({ ownerId: 'demo-user' })
        .sort({ createdAt: -1 })
        .lean();
      return response.status(200).json({ data: items });
    }

    const { name, description, category, type, amount, date } = request.body || {};
    const numericAmount = Number(amount);
    if (!name || !category || !type || !date || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      return response.status(400).json({ message: 'Valid transaction details are required' });
    }

    const item = await Transaction.create({
      name,
      description,
      category,
      type,
      amount: numericAmount,
      date,
      ownerId: 'demo-user'
    });
    return response.status(201).json(item);
  } catch (error) {
    console.error('Transaction API error:', error);
    return response.status(500).json({
      message: error.message === 'MONGODB_URI is not configured'
        ? 'Database is not configured'
        : 'Unable to access the database'
    });
  }
}
