// services/user.service.ts
import prisma from '../config/prisma';
import { UpdateUserInput } from '../types/user.types';

// 유저 조회
export const getUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      nickname: true,
      region: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
    },
  });
};

// 유저 수정
export const updateUser = async (userId: number, updates: UpdateUserInput) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updates,
    select: {
      id: true,
      email: true,
      nickname: true,
      regionId: true,
      region: {
        select: {
          id: true,
          name: true, // ✅ 프론트에서 필요한 name 포함
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

//내가 쓴 게시물 조회
export const getMyPosts = async (userId: number) => {
  const posts = await prisma.post.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      images: {
        take: 1,
        select: { url: true },
      },
      user: {
        select: {
          region: {
            select: { name: true },
          },
        },
      },
      likes: {
        where: { userId }, // 로그인한 유저 기준 찜 여부 확인
        select: { id: true, userId: true },
      },
    },
  });

  return posts.map((post) => ({
    ...post,
    liked: post.likes.some((like) => like.userId === userId),
  }));
};
