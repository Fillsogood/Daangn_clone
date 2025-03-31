// src/utils/jwt.ts
import jwt, { SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const signToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN) : '15m',
  };
  return jwt.sign(payload, secret, options);
};

export const signRefreshToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d', // 또는 process.env.JWT_REFRESH_EXPIRES_IN
  });
};

export const verify = <TPayload extends object>(token: string): TPayload => {
  return jwt.verify(token, secret) as TPayload;
};
