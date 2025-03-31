import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as likeService from '../services/like.service';
import { Like } from '../types/like.types';

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    if (!req.userId || isNaN(postId)) {
      res.status(400).json({ error: '잘못된 요청입니다.' });
      return;
    }

    await likeService.addLike(req.userId, postId);
    res.status(201).json({ message: '관심 등록 완료' });
  } catch {
    res.status(500).json({ error: '관심 등록 실패' });
  }
};

export const unlikePost = async (req: AuthRequest, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    if (!req.userId || isNaN(postId)) {
      res.status(400).json({ error: '잘못된 요청입니다.' });
      return;
    }

    await likeService.removeLike(req.userId, postId);
    res.status(200).json({ message: '관심 해제 완료' });
  } catch {
    res.status(500).json({ error: '관심 해제 실패' });
  }
};

export const getLikedPosts = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: '로그인이 필요합니다.' });
      return;
    }

    const likes = await likeService.getMyLikedPosts(req.userId);
    const posts = likes.map((like: Like) => like.post);

    res.status(200).json({ posts });
  } catch {
    res.status(500).json({ error: '찜한 게시글 조회 실패' });
  }
};
