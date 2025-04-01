import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt';

export interface AuthRequest extends Request {
  userId?: number;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token; // 쿠키에서 토큰 추출

  if (!token) {
    res.status(401).json({ error: '토큰이 없습니다.' });
    return;
  }

  try {
    const decoded = verify<{ userId: number }>(token);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
    return;
  }
};
