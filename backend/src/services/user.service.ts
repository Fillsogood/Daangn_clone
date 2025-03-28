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
// services/user.service.ts
export const updateUser = async (userId: number, updates: UpdateUserInput) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updates,
    select: {
      id: true,
      email: true,
      nickname: true,
      regionId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
