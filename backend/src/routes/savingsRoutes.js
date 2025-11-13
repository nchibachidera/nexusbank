import express from 'express';
import { 
  getSavings, 
  getSavingsById,
  createSavings,
  updateSavings,
  deleteSavings,
  addToSavings
} from '../controllers/savingsController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all savings goals
router.get('/', getSavings);

// Get single savings goal
router.get('/:id', getSavingsById);

// Create new savings goal
router.post('/', createSavings);

// Update savings goal
router.put('/:id', updateSavings);

// Delete savings goal
router.delete('/:id', deleteSavings);

// Add money to savings goal
router.post('/:id/add', addToSavings);

export default router;
