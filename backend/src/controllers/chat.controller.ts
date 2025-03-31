import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as chatService from '../services/chat.service';

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const postId = parseInt(req.body.postId);
    if (!req.userId || isNaN(postId)) {
      res.status(400).json({ error: '잘못된 요청입니다.' });
      return;
    }

    const room = await chatService.createChatRoom(req.userId, postId);
    res.status(201).json({ room });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : '채팅방 생성 실패' });
  }
};
