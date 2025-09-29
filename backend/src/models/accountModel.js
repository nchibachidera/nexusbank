import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Account = sequelize.define('Account', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    accountNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    accountType: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.DECIMAL(15,2), defaultValue: 0.00 }
  }, {
    tableName: 'accounts',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  });
  return Account;
};
