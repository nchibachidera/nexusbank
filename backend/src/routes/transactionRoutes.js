import express from 'express';
import { getTransactions, getTransactionsByAccount, createTransaction } from '../controllers/transactionController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all transactions for logged-in user
router.get('/', authenticate, getTransactions);

// Get transactions for a specific account
router.get('/account/:accountId', authenticate, getTransactionsByAccount);

// Create a new transaction (transfer, deposit, withdraw)
router.post('/', authenticate, createTransaction);

export default router;
