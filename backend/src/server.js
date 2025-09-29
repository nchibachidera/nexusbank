import app from './app.js';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

// Sync DB and start server
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    // Sync models - create tables if not exist
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
};

start();
