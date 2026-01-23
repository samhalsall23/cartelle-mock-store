import { BlogPost } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BlogPostWithAuthor, ServerActionResponse } from "@/types";
import { wrapServerCall } from "@/lib/server/helpers";

// === FETCHES ===
export async function getBlogs(): Promise<ServerActionResponse<BlogPost[]>> {
  return wrapServerCall(async () => {
    const blogs = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return blogs;
  });
}

export async function getBlogById(
  id: string,
): Promise<ServerActionResponse<BlogPost | null>> {
  return wrapServerCall(async () => {
    const blog = await prisma.blogPost.findFirst({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return blog;
  });
}

export async function getBlogBySlug(
  slug: string,
): Promise<ServerActionResponse<BlogPostWithAuthor | null>> {
  return wrapServerCall(async () => {
    const blog = await prisma.blogPost.findFirst({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            occupation: true,
          },
        },
      },
    });

    return blog;
  });
}

export async function getHomePageBlogs(): Promise<
  ServerActionResponse<BlogPostWithAuthor[]>
> {
  return wrapServerCall(async () => {
    const blogs = await prisma.blogPost.findMany({
      take: 4,
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            occupation: true,
          },
        },
      },
    });

    return blogs;
  });
}
