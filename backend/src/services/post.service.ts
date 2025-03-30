import prisma from '../config/prisma';
import { CreatePostInput } from '../types/post.types';

export const createPost = async (userId: number, input: CreatePostInput) => {
  const { title, content, price, images } = input;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      price,
      userId,
      images: {
        create: images.map((url) => ({ url })),
      },
    },
    include: {
      images: true,
    },
  });

  return post;
};
