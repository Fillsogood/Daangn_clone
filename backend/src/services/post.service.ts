import prisma from '../config/prisma';
import { CreatePostInput, GetPostsQuery, UpdatePostInput } from '../types/post.types';

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

export const getPosts = async (query: GetPostsQuery) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          nickname: true,
          region: {
            select: {
              name: true,
            },
          },
        },
      },
      images: {
        take: 1,
        select: { url: true },
      },
    },
  });

  return posts;
};

export const getPostById = async (id: number) => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      user: {
        select: { nickname: true },
      },
      images: {
        select: { url: true },
      },
    },
  });
};

export const updatePost = async (postId: number, userId: number, data: UpdatePostInput) => {
  // 게시글 존재 여부 + 소유자 확인
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.userId !== userId) {
    throw new Error('권한이 없거나 게시글이 존재하지 않습니다.');
  }

  // 기존 이미지 모두 삭제
  if (data.images) {
    await prisma.postImage.deleteMany({ where: { postId } });
  }

  // 게시글 수정
  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      title: data.title,
      content: data.content,
      price: data.price,
      status: data.status,
      updatedAt: new Date(),
      images: data.images
        ? {
            create: data.images.map((url) => ({ url })),
          }
        : undefined,
    },
    include: {
      images: true,
    },
  });

  return updatedPost;
};

export const deletePost = async (postId: number, userId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.userId !== userId) {
    throw new Error('권한이 없거나 게시글이 존재하지 않습니다.');
  }

  // 연결된 이미지 먼저 삭제
  await prisma.postImage.deleteMany({ where: { postId } });

  // 게시글 삭제
  await prisma.post.delete({ where: { id: postId } });

  return true;
};

export const getPostsByRegion = async (regionId: number, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: {
      user: {
        regionId,
      },
    },
    include: {
      user: { select: { nickname: true } },
      images: { take: 1, select: { url: true } },
    },
  });
};

export const updatePostStatus = async (postId: number, userId: number, status: string) => {
  const validStatus = ['selling', 'reserved', 'sold'];

  if (!validStatus.includes(status)) {
    throw new Error('유효하지 않은 상태입니다.');
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new Error('게시글이 존재하지 않습니다.');
  }

  if (post.userId !== userId) {
    throw new Error('수정 권한이 없습니다.');
  }

  return await prisma.post.update({
    where: { id: postId },
    data: { status },
  });
};

export const searchPosts = async (keyword: string, sort: string = 'recent', regionId?: number) => {
  type SortOrder = 'asc' | 'desc';
  let orderBy: { price?: SortOrder; createdAt?: SortOrder };

  switch (sort) {
    case 'price_asc':
      orderBy = { price: 'asc' };
      break;
    case 'price_desc':
      orderBy = { price: 'desc' };
      break;
    case 'recent':
    default:
      orderBy = { createdAt: 'desc' };
      break;
  }

  // 🔍 지역에 속한 유저 ID 목록 조회
  let userIds: number[] | undefined;

  if (regionId) {
    const users = await prisma.user.findMany({
      where: { regionId },
      select: { id: true },
    });
    userIds = users.map((u: { id: number }) => u.id);
  }

  return await prisma.post.findMany({
    where: {
      AND: [
        ...(regionId && userIds?.length ? [{ userId: { in: userIds } }] : []),
        {
          OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }],
        },
      ],
    },
    orderBy,
    select: {
      id: true,
      title: true,
      price: true,
      status: true,
      createdAt: true,
      images: {
        take: 1,
        select: { url: true },
      },
    },
  });
};
