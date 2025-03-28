import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as userService from '../services/user.service';

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.userId === undefined) {
      res.status(400).json({ error: '사용자 ID가 필요합니다.' });
      return;
    }
    const user = await userService.getUserById(req.userId);
    if (!user) {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json({ user });
  } catch {
    res.status(500).json({ error: '내 정보 조회 실패' });
  }
};
