import express from 'express';
import { 
  getTransactions, 
  getTransactionById,
  getTransactionsByAccount, 
  createTransaction 
} from '../controllers/transactionController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add logging middleware
router.use((req, res, next) => {
  console.log('📍 Transaction route hit:', req.method, req.path);
  console.log(' Request body:', req.body);
  next();
});

// Get all transactions for logged-in user
router.get('/', authenticate, getTransactions);

// Get transactions for a specific account (more specific, comes first)
router.get('/account/:accountId', authenticate, getTransactionsByAccount);

// Get single transaction by ID (less specific, comes after)
router.get('/:id', authenticate, getTransactionById);

// Create a new transaction (transfer, deposit, withdraw)
router.post('/', authenticate, createTransaction);

export default router;
