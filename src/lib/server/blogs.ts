"use server";

import { BlogCategory, BlogPost } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { AdminTableAuthorMutation, ServerActionResponse } from "@/types";
import { handleServerAction } from "./helpers";
import { BLOB_STORAGE_PREFIXES } from "../constants";
import { adminRoutes } from "../routing";
import { AdminFormAddBlogsData } from "@/components/admin/forms/AdminBlogsForm/schema";

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

// === MUTATIONS ===
export async function createBlog(
  data: AdminFormAddBlogsData,
): Promise<ServerActionResponse<AdminTableAuthorMutation>> {
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
        duration: 3,
        blogImageUrl: blob.url,
      },
    });

    revalidatePath(adminRoutes.blogs);

    return { id: created.id };
  });
}

export async function deleteBlogById(
  id: string,
): Promise<ServerActionResponse<AdminTableAuthorMutation>> {
  return handleServerAction(async () => {
    const deleted = await prisma.blogPost.delete({ where: { id } });
    revalidatePath(adminRoutes.blogs);

    return { id: deleted.id };
  });
}
