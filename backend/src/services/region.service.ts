import prisma from '../config/prisma';

export const getAllRegionsService = async () => {
  return await prisma.region.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
};
