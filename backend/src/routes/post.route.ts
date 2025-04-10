import express from 'express';
import * as postController from '../controllers/post.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();
router.get('/region', verifyToken, postController.getPostsByUserRegion);
router.get('/search', postController.searchPosts);
router.post('/s3/image/delete', postController.deleteImage);
router.post('/', verifyToken, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.patch('/:id', verifyToken, postController.updatePost);
router.delete('/:id', verifyToken, postController.deletePost);
router.patch('/:id/status', verifyToken, postController.updatePostStatus);

export default router;
