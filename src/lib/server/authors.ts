"use server";

import { prisma } from "@/lib/prisma";
import {
  AdminTableAuthorQuery,
  AdminTableAuthorMutation,
  ServerActionResponse,
} from "@/types";
import { handleServerAction } from "./helpers";

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
