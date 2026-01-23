"use server";

import { BlogCategory, BlogPost } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  BlogMutationInput,
  BlogPostWithAuthor,
  ServerActionResponse,
} from "@/types";
import { getReadingMinutes, handleServerAction } from "@/lib/server";
import { BLOB_STORAGE_PREFIXES } from "@/lib/constants";
import { adminRoutes, routes } from "@/lib/routing";
import {
  AdminFormAddBlogsData,
  AdminFormEditBlogsData,
} from "@/components/admin/forms/AdminBlogsForm/schema";

// === FETCHES ===
export async function getBlogs(): Promise<ServerActionResponse<BlogPost[]>> {
  return handleServerAction(async () => {
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
  return handleServerAction(async () => {
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
  return handleServerAction(async () => {
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
  return handleServerAction(async () => {
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

// === MUTATIONS ===
export async function createBlog(
  data: AdminFormAddBlogsData,
): Promise<ServerActionResponse<BlogMutationInput>> {
  return handleServerAction(async () => {
    const imageFile = data.image;
    const imageFileName = BLOB_STORAGE_PREFIXES.BLOGS + data.slug;

    const blob = await put(imageFileName, imageFile, {
      access: "public",
      addRandomSuffix: true,
    });

    const created = await prisma.blogPost.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category as BlogCategory,
        slug: data.slug,
        content: data.content,
        authorId: data.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
        duration: getReadingMinutes(data.content),
        blogImageUrl: blob.url,
      },
    });

    revalidatePath(adminRoutes.blogs);
    revalidatePath(routes.blog);
    revalidatePath(routes.home);

    return { id: created.id };
  });
}

export async function updateBlogById(
  id: string,
  data: AdminFormEditBlogsData,
): Promise<ServerActionResponse<BlogMutationInput>> {
  return handleServerAction(async () => {
    revalidatePath(adminRoutes.blogs);
    revalidatePath(routes.blog);
    revalidatePath(routes.home);

    if (data.image) {
      const imageFile = data.image;
      const imageFileName = BLOB_STORAGE_PREFIXES.BLOGS + data.slug;

      const blob = await put(imageFileName, imageFile, {
        access: "public",
        addRandomSuffix: true,
      });

      const updated = await prisma.blogPost.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          category: data.category as BlogCategory,
          slug: data.slug,
          content: data.content,
          authorId: data.authorId,
          createdAt: new Date(),
          updatedAt: new Date(),
          duration: getReadingMinutes(data.content),
          blogImageUrl: blob.url,
        },
      });

      return { id: updated.id };
    }

    // If no new image, just update other fields
    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        category: data.category as BlogCategory,
        slug: data.slug,
        content: data.content,
        authorId: data.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
        duration: getReadingMinutes(data.content),
      },
    });
    return { id: updated.id };
  });
}

export async function deleteBlogById(
  id: string,
): Promise<ServerActionResponse<BlogMutationInput>> {
  return handleServerAction(async () => {
    const deleted = await prisma.blogPost.delete({ where: { id } });
    revalidatePath(adminRoutes.blogs);
    revalidatePath(routes.blog);
    revalidatePath(routes.home);

    return { id: deleted.id };
  });
}
