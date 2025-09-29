import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const signToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
