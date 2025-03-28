import express from 'express';
import * as authController from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

//로그인한 사용자 정보 조회
router.get('/me', verifyToken, authController.getMe);

export default router;
