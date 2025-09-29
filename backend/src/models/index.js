import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  logging: false
});

// Import models
import UserModel from './userModel.js';
import AccountModel from './accountModel.js';
import TransactionModel from './transactionModel.js';
import SavingsGoalModel from './savingsGoalModel.js';
import ReferralModel from './referralModel.js';
import AdminModel from './adminModel.js';

const User = UserModel(sequelize);
const Account = AccountModel(sequelize);
const Transaction = TransactionModel(sequelize);
const SavingsGoal = SavingsGoalModel(sequelize);
const Referral = ReferralModel(sequelize);
const Admin = AdminModel(sequelize);

// Associations
User.hasMany(Account, { foreignKey: 'userId', onDelete: 'CASCADE' });
Account.belongsTo(User, { foreignKey: 'userId' });

Account.hasMany(Transaction, { foreignKey: 'accountId', onDelete: 'CASCADE' });
Transaction.belongsTo(Account, { foreignKey: 'accountId' });

User.hasMany(SavingsGoal, { foreignKey: 'userId', onDelete: 'CASCADE' });
SavingsGoal.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Referral, { foreignKey: 'userId', onDelete: 'CASCADE' });
Referral.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Account, Transaction, SavingsGoal, Referral, Admin };
