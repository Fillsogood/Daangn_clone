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

export const getLikedPostsByUser = async (userId: number) => {
  const likes = await prisma.like.findMany({
    where: { userId },
    select: {
      post: {
        include: {
          images: { take: 1, select: { url: true } },
          user: {
            select: {
              nickname: true,
              region: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  // `post`에 liked: true 추가
  return likes.map((like) => ({
    ...like.post,
    liked: true,
  }));
};
