import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const SavingsGoal = sequelize.define('SavingsGoal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    goalName: { type: DataTypes.STRING, allowNull: false },
    targetAmount: { type: DataTypes.DECIMAL(15,2), allowNull: false },
    currentAmount: { type: DataTypes.DECIMAL(15,2), defaultValue: 0.00 },
    deadline: { type: DataTypes.DATE }
  }, {
    tableName: 'savings_goals',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  });
  return SavingsGoal;
};
