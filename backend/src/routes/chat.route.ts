import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import * as chatController from '../controllers/chat.controller';

const router = express.Router();

router.post('/', verifyToken, chatController.createRoom);
router.get('/', verifyToken, chatController.getMyChatRooms);
router.delete('/:id', verifyToken, chatController.deleteChatRoom);
router.get('/:id/messages', verifyToken, chatController.getMessagesByRoom);
router.post('/:id/messages', verifyToken, chatController.sendMessage);
export default router;
