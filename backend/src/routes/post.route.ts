import express from 'express';
import { createPost, getPosts } from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createPost);
router.get('/', getPosts);

export default router;
