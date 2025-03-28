// services/user.service.ts
import prisma from '../config/prisma';

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
