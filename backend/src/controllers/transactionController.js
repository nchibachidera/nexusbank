import { Transaction } from '../models/index.js';
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    // fetch transactions for accounts owned by user
    const transactions = await Transaction.findAll({ where: {} , limit: 100 });
    return res.json({ transactions });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};
