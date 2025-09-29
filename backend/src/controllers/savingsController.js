import { SavingsGoal } from '../models/index.js';
export const getSavings = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await SavingsGoal.findAll({ where: { userId } });
    return res.json({ goals });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};
