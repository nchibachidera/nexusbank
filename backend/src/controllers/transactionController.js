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
    
    console.log('🔵 CREATE TRANSACTION CALLED');
    console.log('📥 Request body:', req.body);
    console.log('📥 accountId:', accountId, 'type:', typeof accountId);
    
    // Convert accountId to integer
    const accountIdInt = parseInt(accountId);
    const toAccountIdInt = toAccountId ? parseInt(toAccountId) : null;
    
    console.log('🔢 Parsed accountIdInt:', accountIdInt, 'toAccountIdInt:', toAccountIdInt);
    
    // Validate required fields
    if (!transactionType || !amount || !accountIdInt || isNaN(accountIdInt)) {
      await t.rollback();
      return res.status(400).json({ message: 'transactionType, amount, and valid accountId are required' });
    }
    
    if (amount <= 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }
    
    // Verify account belongs to user
    console.log('🔍 Looking for source account - ID:', accountIdInt, 'userId:', userId);
    const account = await Account.findOne({ where: { id: accountIdInt, userId }, transaction: t });
    console.log('📝 Source account found:', account ? `ID: ${account.id}, Balance: ${account.balance}, Type: ${account.accountType}` : 'NOT FOUND');
    
    if (!account) {
      await t.rollback();
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Handle different transaction types
    if (transactionType === 'transfer') {
      console.log('💸 Processing transfer...');
      
      // Check if toAccountId is provided, if not check for accountNumber
      let toAccount;
      
      if (toAccountIdInt) {
        console.log('🔍 Finding recipient by ID:', toAccountIdInt);
        toAccount = await Account.findOne({ where: { id: toAccountIdInt }, transaction: t });
      } else if (req.body.toAccountNumber) {
        console.log('🔍 Finding recipient by account number:', req.body.toAccountNumber);
        toAccount = await Account.findOne({ where: { accountNumber: req.body.toAccountNumber }, transaction: t });
      }
      
      console.log('📝 Recipient account found:', toAccount ? `ID: ${toAccount.id}, Balance: ${toAccount.balance}, AccountNumber: ${toAccount.accountNumber}` : 'NOT FOUND');
      
      if (!toAccount) {
        await t.rollback();
        return res.status(404).json({ message: 'Destination account not found' });
      }
      
      // Check sufficient balance
      console.log('💰 Checking balance: Need', amount, 'Have', parseFloat(account.balance));
      if (parseFloat(account.balance) < amount) {
        await t.rollback();
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      
      // Update balances
      const newSourceBalance = parseFloat(account.balance) - amount;
      const newDestBalance = parseFloat(toAccount.balance) + amount;
      
      console.log('⬇️ Updating source account', account.id, 'balance from', account.balance, 'to', newSourceBalance);
      await account.update({ balance: newSourceBalance }, { transaction: t });
      
      console.log('⬆️ Updating recipient account', toAccount.id, 'balance from', toAccount.balance, 'to', newDestBalance);
      await toAccount.update({ balance: newDestBalance }, { transaction: t });
      
      // Create debit transaction for sender
      console.log('📝 Creating transfer_out transaction for account', accountIdInt);
      await Transaction.create({
        accountId: accountIdInt,
        transactionType: 'transfer_out',
        amount,
        description: description || `Transfer to ${toAccount.accountNumber}`,
        status: 'completed'
      }, { transaction: t });
      
      // Create credit transaction for receiver
      console.log('📝 Creating transfer_in transaction for account', toAccount.id);
      await Transaction.create({
        accountId: toAccount.id,
        transactionType: 'transfer_in',
        amount,
        description: description || `Transfer from ${account.accountNumber}`,
        status: 'completed'
      }, { transaction: t });
      
      console.log('💾 Committing transaction...');
      await t.commit();
      console.log('✅ Transfer completed successfully!');
      return res.status(201).json({ message: 'Transfer completed successfully' });
      
    } else if (transactionType === 'deposit') {
      // Update balance
      await account.update({ balance: parseFloat(account.balance) + amount }, { transaction: t });
      
      // Create transaction record
      const transaction = await Transaction.create({
        accountId: accountIdInt,
        transactionType: 'deposit',
        amount,
        description: description || 'Deposit',
        status: 'completed'
      }, { transaction: t });
      
      await t.commit();
      return res.status(201).json({ transaction, message: 'Deposit completed successfully' });
      
    } else if (transactionType === 'withdraw') {
      // Check sufficient balance
      if (parseFloat(account.balance) < amount) {
        await t.rollback();
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      
      // Update balance
      await account.update({ balance: parseFloat(account.balance) - amount }, { transaction: t });
      
      // Create transaction record
      const transaction = await Transaction.create({
        accountId: accountIdInt,
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
    console.error('❌ Error creating transaction:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};