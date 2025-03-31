import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as chatService from '../services/chat.service';

//채팅방 생성
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

// 메시지 조회
export const getMessagesByRoom = async (req: AuthRequest, res: Response) => {
  try {
    const roomId = parseInt(req.params.id);
    if (isNaN(roomId)) {
      res.status(400).json({ error: '유효한 채팅방 ID가 아닙니다.' });
      return;
    }

    const messages = await chatService.getMessagesByRoom(roomId);
    res.status(200).json({ messages });
  } catch {
    res.status(500).json({ error: '채팅 메시지 조회 실패' });
  }
};

// 메시지 전송 테스트 rest api
export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const roomId = parseInt(req.params.id);
    const { content } = req.body;

    if (!req.userId || isNaN(roomId) || !content) {
      res.status(400).json({ error: '잘못된 요청입니다.' });
      return;
    }

    const message = await chatService.sendMessage(roomId, req.userId, content);
    res.status(201).json({ message });
  } catch (err) {
    res.status(403).json({ error: err instanceof Error ? err.message : '메시지 전송 실패' });
  }
};
