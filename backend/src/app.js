import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import savingsRoutes from './routes/savingsRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//  Test route to verify backend connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected successfully!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/notifications', notificationRoutes);

// Optional base route
app.get('/', (req, res) => res.json({ message: 'NexusBank backend (Sequelize) is running' }));

export default app;

