import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger';
import authRouter from './src/routes/auth.route';
import userRouter from './src/routes/user.route';
import regionRouter from './src/routes/region.route';
import postRouter from './src/routes/post.route';
import likeRouter from './src/routes/like.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Swagger UI 연결
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth API 라우터 연결
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter, likeRouter);
app.use('/api/regions', regionRouter);
app.use('/api/posts', postRouter, likeRouter);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('당근 백엔드 서버 실행 중!');
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
});
