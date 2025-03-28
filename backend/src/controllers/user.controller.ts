import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as userService from '../services/user.service';
import { UpdateUserInput } from '../types/user.types';

// 내 정보 조회
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // 사용자 검증
    if (req.userId === undefined) {
      res.status(400).json({ error: '사용자 ID가 필요합니다.' });
      return;
    }
    // Id값으로 내 정보 조회
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

export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
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

    // 수정할 데이터
    const updates: UpdateUserInput = {
      nickname: req.body.nickname,
      email: req.body.email,
      regionId: req.body.regionId,
    };

    const updatedUser = await userService.updateUser(req.userId, updates);

    res.status(200).json({
      message: '회원 정보가 성공적으로 수정되었습니다.',
      user: updatedUser,
    });
  } catch {
    res.status(500).json({ error: '회원 정보 수정 중 오류가 발생했습니다.' });
  }
};
