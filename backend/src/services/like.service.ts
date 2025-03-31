// services/like.service.ts
import prisma from '../config/prisma';

export const addLike = async (userId: number, postId: number) => {
  return await prisma.like.create({
    data: { userId, postId },
  });
};

export const removeLike = async (userId: number, postId: number) => {
  return await prisma.like.deleteMany({
    where: { userId, postId },
  });
};

export const getMyLikedPosts = async (userId: number) => {
  return await prisma.like.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          user: { select: { nickname: true } },
          images: { take: 1, select: { url: true } },
        },
      },
    },
  });
};
