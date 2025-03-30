import { Request, Response } from 'express';
import { CreatePostInput, UpdatePostInput } from '../types/post.types';
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

// 특정 게시물 조회 기능
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    if (isNaN(postId)) {
      res.status(400).json({ error: '유효한 게시글 ID가 아닙니다.' });
      return;
    }

    const post = await postService.getPostById(postId);

    if (!post) {
      res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: '게시글 조회 실패', message: err });
  }
};

//게시글 수정 기능
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    if (!req.userId || isNaN(postId)) {
      res.status(400).json({ error: '잘못된 요청입니다.' });
      return;
    }

    const updated = await postService.updatePost(postId, req.userId, req.body as UpdatePostInput);
    res.status(200).json({ message: '게시글이 수정되었습니다.', post: updated });
  } catch (err) {
    res.status(403).json({ error: err instanceof Error ? err.message : '수정 실패' });
  }
};

//게시글 삭제 기능
export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.id);
    if (!req.userId || isNaN(postId)) {
      res.status(400).json({ error: '잘못된 요청입니다.' });
      return;
    }

    await postService.deletePost(postId, req.userId);
    res.status(200).json({ message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    res.status(403).json({ error: err instanceof Error ? err.message : '삭제 실패' });
  }
};
