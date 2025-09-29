import { Account } from '../models/index.js';
export const getAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await Account.findAll({ where: { userId } });
    return res.json({ accounts });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};
