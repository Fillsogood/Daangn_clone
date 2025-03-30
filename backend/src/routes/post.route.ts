import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUserRegion,
} from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();
router.get('/region', verifyToken, getPostsByUserRegion);
router.post('/', verifyToken, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.patch('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

export default router;
