import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    transactionType: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.DECIMAL(15,2), allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
  }, {
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  });
  return Transaction;
};
