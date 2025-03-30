import express from 'express';
import { createPost, getPosts, getPostById } from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);

export default router;
