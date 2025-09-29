import express from 'express';
import { getSavings } from '../controllers/savingsController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/', authenticate, getSavings);
export default router;
