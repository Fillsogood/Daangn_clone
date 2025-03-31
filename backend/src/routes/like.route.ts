import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import * as likeController from '../controllers/like.controller';

const router = express.Router();

router.post('/:id/like', verifyToken, likeController.likePost);
router.delete('/:id/like', verifyToken, likeController.unlikePost);
router.get('/me/likes', verifyToken, likeController.getLikedPosts);

export default router;
