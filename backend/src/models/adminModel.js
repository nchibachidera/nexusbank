import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'admin' }
  }, {
    tableName: 'admins',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  });
  return Admin;
};
