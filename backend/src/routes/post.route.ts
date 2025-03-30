import express from 'express';
import { createPost, getPosts, getPostById, updatePost } from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.patch('/:id', verifyToken, updatePost);
export default router;
