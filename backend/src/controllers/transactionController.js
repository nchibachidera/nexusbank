import { Transaction, Account } from '../models/index.js';
import { Op } from 'sequelize';
import { sequelize } from '../models/index.js';

// Get all transactions for logged-in user
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // First, get all accounts belonging to this user
    const userAccounts = await Account.findAll({ 
      where: { userId },
      attributes: ['id']
    });
    
    const accountIds = userAccounts.map(acc => acc.id);
    
    // Fetch transactions where accountId belongs to user
    const transactions = await Transaction.findAll({ 
      where: {
        accountId: accountIds
      },
      order: [['createdAt', 'DESC']],
      limit: 100 
    });
    
    return res.json({ transactions });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get transactions for a specific account
export const getTransactionsByAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountId } = req.params;
    
    // Verify the account belongs to this user
    const account = await Account.findOne({ where: { id: accountId, userId } });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Get transactions for this account
    const transactions = await Transaction.findAll({
      where: { accountId },
      order: [['createdAt', 'DESC']],
      limit: 100
    });
    
    return res.json({ transactions });
  } catch (err) {
    console.error('Error fetching account transactions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new transaction (transfer, deposit, withdraw)
export const createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { transactionType, amount, accountId, toAccountId, description } = req.body;
    
    // Validate required fields
    if (!transactionType || !amount || !accountId) {
      await t.rollback();
      return res.status(400).json({ message: 'transactionType, amount, and accountId are required' });
    }
    
    if (amount <= 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    
    // Verify account belongs to user
    const account = await Account.findOne({ where: { id: accountId, userId }, transaction: t });
    if (!account) {
      await t.rollback();
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Handle different transaction types
    if (transactionType === 'transfer') {
      if (!toAccountId) {
        await t.rollback();
        return res.status(400).json({ message: 'toAccountId is required for transfers' });
      }
      
      // Check sufficient balance
      if (account.balance < amount) {
        await t.rollback();
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      
      // Get destination account
      const toAccount = await Account.findOne({ where: { id: toAccountId }, transaction: t });
      if (!toAccount) {
        await t.rollback();
        return res.status(404).json({ message: 'Destination account not found' });
      }
      
      // Update balances
      await account.update({ balance: account.balance - amount }, { transaction: t });
      await toAccount.update({ balance: toAccount.balance + amount }, { transaction: t });
      
      // Create debit transaction for sender
      await Transaction.create({
        accountId,
        transactionType: 'transfer_out',
        amount,
        description: description || `Transfer to ${toAccount.accountNumber}`,
        status: 'completed'
      }, { transaction: t });
      
      // Create credit transaction for receiver
      await Transaction.create({
        accountId: toAccountId,
        transactionType: 'transfer_in',
        amount,
        description: description || `Transfer from ${account.accountNumber}`,
        status: 'completed'
      }, { transaction: t });
      
      await t.commit();
      return res.status(201).json({ message: 'Transfer completed successfully' });
      
    } else if (transactionType === 'deposit') {
      // Update balance
      await account.update({ balance: account.balance + amount }, { transaction: t });
      
      // Create transaction record
      const transaction = await Transaction.create({
        accountId,
        transactionType: 'deposit',
        amount,
        description: description || 'Deposit',
        status: 'completed'
      }, { transaction: t });
      
      await t.commit();
      return res.status(201).json({ transaction, message: 'Deposit completed successfully' });
      
    } else if (transactionType === 'withdraw') {
      // Check sufficient balance
      if (account.balance < amount) {
        await t.rollback();
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      
      // Update balance
      await account.update({ balance: account.balance - amount }, { transaction: t });
      
      // Create transaction record
      const transaction = await Transaction.create({
        accountId,
        transactionType: 'withdraw',
        amount,
        description: description || 'Withdrawal',
        status: 'completed'
      }, { transaction: t });
      
      await t.commit();
      return res.status(201).json({ transaction, message: 'Withdrawal completed successfully' });
      
    } else {
      await t.rollback();
      return res.status(400).json({ message: 'Invalid transaction type' });
    }
    
  } catch (err) {
    await t.rollback();
    console.error('Error creating transaction:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};