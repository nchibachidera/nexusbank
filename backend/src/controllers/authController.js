import bcrypt from 'bcrypt';
import { User, Account } from '../models/index.js';
import { signToken } from '../utils/jwt.js';
import { Op } from 'sequelize';

export const register = async (req, res) => {
  try {
    console.log('📥 Received registration data:', req.body);
    
    const { fullName, email, password, phone } = req.body;
    
    if (!fullName || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'Missing fields' });
    }
    
    // Check existing user
    const existing = await User.findOne({ where: { [Op.or]: [{ email }] } });
    if (existing) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    
    console.log('📝 Creating user with:', { fullName, email, phone });
    const user = await User.create({ fullName, email, password: hashed, phone });
    
    // Create default savings account for user with generated account number
    const accountNumber = 'NB' + Date.now().toString().slice(-10);
    await Account.create({ userId: user.id, accountNumber, accountType: 'savings', balance: 0.00 });
    
    const token = signToken({ id: user.id, email: user.email });
    
    console.log('✅ User created successfully');
    return res.status(201).json({ user: { id: user.id, fullName: user.fullName, email: user.email }, token });
  } catch (err) {
    console.error('❌ Registration error:', err);
    console.error('Error details:', err.message);
    console.error('Error stack:', err.stack);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken({ id: user.id, email: user.email });
    return res.json({ user: { id: user.id, fullName: user.fullName, email: user.email }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
