import { SavingsGoal } from '../models/index.js';

// Get all savings goals for user
export const getSavings = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await SavingsGoal.findAll({ 
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    return res.json({ goals });
  } catch (err) {
    console.error('Error fetching savings goals:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single savings goal by ID
export const getSavingsById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const goal = await SavingsGoal.findOne({
      where: { id, userId }
    });

    if (!goal) {
      return res.status(404).json({ message: 'Savings goal not found' });
    }

    return res.json(goal);
  } catch (err) {
    console.error('Error fetching savings goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new savings goal
export const createSavings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { goalName, targetAmount, deadline, currentAmount } = req.body;

    // Validation
    if (!goalName || !targetAmount) {
      return res.status(400).json({ message: 'Goal name and target amount are required' });
    }

    if (targetAmount <= 0) {
      return res.status(400).json({ message: 'Target amount must be greater than 0' });
    }

    const newGoal = await SavingsGoal.create({
      userId,
      goalName,
      targetAmount,
      deadline: deadline || null,
      currentAmount: currentAmount || 0
    });

    return res.status(201).json(newGoal);
  } catch (err) {
    console.error('Error creating savings goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update savings goal
export const updateSavings = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { goalName, targetAmount, deadline, currentAmount } = req.body;

    const goal = await SavingsGoal.findOne({
      where: { id, userId }
    });

    if (!goal) {
      return res.status(404).json({ message: 'Savings goal not found' });
    }

    // Update fields
    if (goalName !== undefined) goal.goalName = goalName;
    if (targetAmount !== undefined) goal.targetAmount = targetAmount;
    if (deadline !== undefined) goal.deadline = deadline;
    if (currentAmount !== undefined) goal.currentAmount = currentAmount;

    await goal.save();

    return res.json(goal);
  } catch (err) {
    console.error('Error updating savings goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete savings goal
export const deleteSavings = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const goal = await SavingsGoal.findOne({
      where: { id, userId }
    });

    if (!goal) {
      return res.status(404).json({ message: 'Savings goal not found' });
    }

    await goal.destroy();

    return res.json({ message: 'Savings goal deleted successfully' });
  } catch (err) {
    console.error('Error deleting savings goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add money to savings goal
export const addToSavings = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const goal = await SavingsGoal.findOne({
      where: { id, userId }
    });

    if (!goal) {
      return res.status(404).json({ message: 'Savings goal not found' });
    }

    // Add to current amount
    goal.currentAmount = parseFloat(goal.currentAmount) + parseFloat(amount);

    await goal.save();

    return res.json(goal);
  } catch (err) {
    console.error('Error adding to savings goal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
