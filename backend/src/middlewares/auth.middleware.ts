import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt';

export interface AuthRequest extends Request {
  userId?: number;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: '토큰이 없습니다.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    req.userId = verify<{ userId: number }>(token).userId;
    next();
  } catch {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
    return;
  }
};
