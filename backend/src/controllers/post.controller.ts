import { Response } from 'express';
import { CreatePostInput } from '../types/post.types';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as postService from '../services/post.service';

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: '로그인이 필요합니다.' });
      return;
    }

    const input: CreatePostInput = req.body;
    const post = await postService.createPost(req.userId, input);

    res.status(201).json({ message: '게시글 등록 성공', post });
  } catch (err) {
    res.status(500).json({ error: '게시글 등록 중 오류 발생', message: err });
  }
};
