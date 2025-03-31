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
import chatRouter from './src/routes/chat.route';

import http from 'http';
import { Server } from 'socket.io';
import { registerChatSocket } from './sockets/chat.socket';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // 프론트 도메인으로 변경 가능
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Swagger UI 연결
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth API 라우터 연결
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter, likeRouter);
app.use('/api/regions', regionRouter);
app.use('/api/posts', postRouter, likeRouter);
app.use('/api/chatrooms', chatRouter);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('당근 백엔드 서버 실행 중!');
});

// WebSocket 이벤트 등록
io.on('connection', (socket) => {
  console.log('🔌 클라이언트 접속:', socket.id);
  registerChatSocket(io, socket);
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
});
