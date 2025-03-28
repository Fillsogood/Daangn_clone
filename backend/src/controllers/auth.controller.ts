import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../config/prisma';
import { signToken, signRefreshToken, verify } from '../utils/jwt';

// 회원가입
export const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json({ message: '회원가입 완료', user: result });
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : '회원가입 실패' });
  }
};

// JWT 토큰 로그인(cookie & json)
export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    res
      .cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60,
      })
      .cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      .status(200)
      .json({ message: '로그인 성공', ...result });
  } catch (err) {
    res.status(401).json({
      error: err instanceof Error ? err.message : '로그인 실패',
    });
  }
};

// 로그아웃
export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(200).json({ message: '이미 로그아웃 상태입니다.' });
    return;
  }

  try {
    // Refresh Token을 가진 사용자 찾기
    // DB에서 토큰 제거
    await prisma.user.update({
      where: { id: verify<{ userId: number }>(token).userId },
      data: { refreshToken: null },
    });

    // 쿠키 제거
    res
      .clearCookie('token')
      .clearCookie('refreshToken', { path: '/auth/refresh' })
      .status(200)
      .json({ message: '로그아웃 되었습니다.' });
  } catch {
    res.status(400).json({ error: '잘못된 요청입니다.' });
  }
};

// 내 토큰 유효 검사
export const me = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: false, nickname: false, regionId: false },
    });

    if (!user) {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json({ user });
  } catch {
    res.status(500).json({ error: '내 정보 조회 실패' });
  }
};

// 토큰 재발급
export const refresh = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken;

  // 토큰이 들어있는지 검증
  if (!token) {
    res.status(401).json({ error: 'Refresh Token이 없습니다.' });
    return;
  }

  // DB에 저장된 Refresh Token 검증
  try {
    const user = await prisma.user.findUnique({
      where: { id: verify<{ userId: number }>(token).userId },
    });

    if (!user || user.refreshToken !== token) {
      res.status(403).json({ error: 'Refresh Token이 유효하지 않습니다.' });
      return;
    }

    // 새 토큰 발급
    const newAccessToken = signToken({ userId: user.id });
    const newRefreshToken = signRefreshToken({ userId: user.id });

    // Refresh Token 갱신
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // 쿠키로 다시 전송
    res
      .cookie('token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 15, // 15분
      })
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        path: '/auth/refresh',
      })
      .status(200)
      .json({ message: '토큰이 재발급되었습니다.' });
  } catch {
    res.status(401).json({ error: '유효하지 않은 Refresh Token입니다.' });
  }
};
