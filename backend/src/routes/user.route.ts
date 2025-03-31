import express from 'express';
import * as userController from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

//로그인한 사용자 정보 조회
router.get('/me', verifyToken, userController.getMe);
// 내 정보 수정
router.patch('/me', verifyToken, userController.updateMe);

router.get('/me/posts', verifyToken, userController.getMyPosts);

export default router;
