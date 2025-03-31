import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { signRefreshToken, signToken } from '../utils/jwt';
import { SignupInput, LoginInput } from '../types/auth.types';

export const signup = async (input: SignupInput) => {
  const { email, password, nickname, regionId } = input;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('이미 존재하는 이메일입니다.');
  }

  const region = await prisma.region.findUnique({ where: { id: regionId } });
  if (!region) {
    throw new Error('존재하지 않는 지역입니다.');
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashed,
      nickname,
      regionId,
    },
  });
};

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
  }

  const token = signToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });

  // DB에 저장
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });
  return {
    token,
    refreshToken,
  };
};
