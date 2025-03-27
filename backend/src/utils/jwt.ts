// src/utils/jwt.ts
import jwt, { SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const signToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN) : '1h',
  };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
