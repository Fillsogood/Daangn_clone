import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../config/prisma';

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json({ message: '회원가입 완료', user: result });
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : '회원가입 실패' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ message: '로그인 성공', ...result });
  } catch (err) {
    res.status(401).json({ error: err instanceof Error ? err.message : '로그인 실패' });
  }
};

export const me = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: false, nickname: false, regionId: false },
    });

    if (!user) {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json({ user });
  } catch {
    res.status(500).json({ error: '내 정보 조회 실패' });
  }
};
