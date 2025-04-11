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

export const optionalAuthMiddleware = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return next(); // 로그인 안 한 경우도 통과

  try {
    const decoded = verify<{ userId: number }>(token);
    req.userId = decoded.userId;
  } catch {
    // 토큰이 잘못됐으면 로그인 안 한 걸로 간주
  }

  next();
};
