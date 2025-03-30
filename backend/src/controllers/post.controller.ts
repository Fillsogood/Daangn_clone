import { Request, Response } from 'express';
import { CreatePostInput } from '../types/post.types';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as postService from '../services/post.service';

// 게시물 작성
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

// 게시글 목록 조회
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit } = req.query;
    const posts = await postService.getPosts({
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: '게시글 목록 조회 실패', message: err });
  }
};
