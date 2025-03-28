import express from 'express';
import * as authController from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.me);
router.post('/refresh', authController.refresh);
export default router;
