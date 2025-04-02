import express from 'express';
import * as authController from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

// 회원가입
router.post('/signup', authController.signup);
// 로그인
router.post('/login', authController.login);
// 토큰 유효 검사
router.get('/me', verifyToken, authController.me);
// 리프레시 재발급
router.get('/refresh', authController.refresh);
//로그아웃
router.post('/logout', authController.logout);
// 카카오 핸들러
router.get('/kakao', authController.kakaoLogin);
// 카카오 콜백 핸들러
router.get('/kakao/callback', authController.kakaoCallback);

export default router;
