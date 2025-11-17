"use server";

import { put } from "@vercel/blob";

import { prisma } from "@/lib/prisma";
import {
  AdminTableAuthorQuery,
  AdminTableAuthorMutation,
  ServerActionResponse,
} from "@/types";
import { handleServerAction } from "./helpers";
import { AdminFormAuthorsData } from "@/components/admin/forms/AdminFormAuthors/schema";

// === FETCHES ===
export async function getAuthors(): Promise<
  ServerActionResponse<AdminTableAuthorQuery[]>
> {
  return handleServerAction(() =>
    prisma.author.findMany({
      include: { _count: { select: { posts: true } } },
    }),
  );
}

// === MUTATIONS ===
export async function deleteAuthorById(
  id: string,
): Promise<ServerActionResponse<AdminTableAuthorMutation>> {
  return handleServerAction(async () => {
    const deleted = await prisma.author.delete({ where: { id } });
    return { id: deleted.id };
  });
}

export async function createAuthor(
  data: AdminFormAuthorsData,
): Promise<ServerActionResponse<AdminTableAuthorMutation>> {
  return handleServerAction(async () => {
    // upload image to blob storage
    const imageFile = data.image;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
      addRandomSuffix: true,
    });

    const created = await prisma.author.create({
      data: {
        name: data.name,
        occupation: data.occupation,
        avatarUrl: blob.url,
      },
    });
    return { id: created.id };
  });
}
