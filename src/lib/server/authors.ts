"use server";

import { Author } from "@prisma/client";
import { put } from "@vercel/blob";

import { prisma } from "@/lib/prisma";
import {
  AdminTableAuthorQuery,
  AdminTableAuthorMutation,
  ServerActionResponse,
} from "@/types";
import { handleServerAction } from "./helpers";
import { AdminFormAuthorsData } from "@/components/admin/forms/AdminFormAuthors/schema";
import { BLOB_STORAGE_PREFIXES } from "../constants";

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

export async function getAuthorById(
  id: string,
): Promise<ServerActionResponse<Author | null>> {
  return handleServerAction(() =>
    prisma.author.findUnique({
      where: { id },
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
    const imageFile = data.image;
    const imageFileName = BLOB_STORAGE_PREFIXES.AUTHORS + "/" + data.name;

    const blob = await put(imageFileName, imageFile, {
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

// export async function updateAuthorById(
//   id: string,
//   data: AdminFormAuthorsData,
// ): Promise<ServerActionResponse<AdminTableAuthorMutation>> {
//   return handleServerAction(async () => {
//     prisma.author.update({
//       where: { id },
//       data: {
//         name: data.name,
//         occupation: data.occupation,
//       },
//     });
//   });
// }
