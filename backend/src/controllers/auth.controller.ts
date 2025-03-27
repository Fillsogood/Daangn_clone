import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json({ message: '회원가입 완료', user: result });
  } catch (err: any) {
    res.status(400).json({ error: err.message || '회원가입 실패' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ message: '로그인 성공', ...result });
  } catch (err: any) {
    res.status(401).json({ error: err.message || '로그인 실패' });
  }
};
