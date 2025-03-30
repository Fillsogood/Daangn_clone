import express from 'express';
import { createPost } from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createPost);

export default router;
