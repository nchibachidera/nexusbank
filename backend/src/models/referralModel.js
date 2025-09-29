import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Referral = sequelize.define('Referral', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    referralCode: { type: DataTypes.STRING, allowNull: false, unique: true },
    invitedUserId: { type: DataTypes.INTEGER, allowNull: true },
    rewardStatus: { type: DataTypes.STRING, defaultValue: 'pending' }
  }, {
    tableName: 'referrals',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  });
  return Referral;
};
