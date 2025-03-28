import axios from 'axios';
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
    // 재사용 감지 + 방지 로직
    if (!user || user.refreshToken !== token) {
      if (user) {
        // DB 토큰 강제 제거 (세션 무효화)
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: null },
        });
      }

      res
        .clearCookie('token')
        .clearCookie('refreshToken', { path: '/auth/refresh' })
        .status(403)
        .json({ error: '재사용된 Refresh Token입니다. 보안을 위해 로그아웃됩니다.' });
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

// 카카오 로그인 URL로 리디렉션하는 핸들러
export const kakaoLogin = (req: Request, res: Response) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoAuthUrl);
};

// 카카오 로그인 완료 후, 콜백을 받아 처리하는 핸들러
export const kakaoCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

// 인가 코드로 카카오에 Access Token 요청
  const tokenRes = await axios.post('https://kauth.kakao.com/oauth/token', null, {
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const kakaoAccessToken = tokenRes.data.access_token;

  // 카카오 사용자 정보 요청
  const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${kakaoAccessToken}` },
  });
  
  // 사용자 정보 추출 
  const kakaoUser = userRes.data;
  const kakaoId = kakaoUser.id;
  const nickname = kakaoUser.properties.nickname;
  const email = kakaoUser.kakao_account?.email || null;

  // DB에서 해당 소셜 계정이 연결된 유저 찾기
  let user = await prisma.user.findFirst({
    where: {
      socialAccounts: {
        some: {
          provider: 'kakao',
          socialId: String(kakaoId),
        },
      },
    },
  });
  // 유저가 없으면 새로 회원가입 처리
  if (!user) {
    user = await prisma.user.create({
      data: {
        nickname,
        email,
        regionId: 1,
        socialAccounts: {
          create: [{ provider: 'kakao', socialId: String(kakaoId) }],
        },
      },
    });
  }
  // JWT Access / Refresh Token 발급
  const accessToken = signToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });

  // DB에 새 Refresh Token 저장
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res
    .cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15,
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .redirect('http://localhost:3000'); // 로그인 완료 후 프론트로 리디렉션
};