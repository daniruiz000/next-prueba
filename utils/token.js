import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (email, password) => {
  if (!email || !password) {
    throw new Error('Email or password missing');
  }

  const payload = {
    email,
    password
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  return token;
};

export const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is missing');
  }
  const result = jwt.verify(token, JWT_SECRET);
  return result;
};
