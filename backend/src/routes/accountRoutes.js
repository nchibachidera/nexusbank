import express from 'express';
import { getAccounts } from '../controllers/accountController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/', authenticate, getAccounts);
export default router;
