import { prisma } from "@/lib/prisma";
import { AuthorWithPostCount, ServerActionResponse } from "@/types";
import { handleServerAction } from "../actions";
import { Author } from "@prisma/client";

// === FETCHES ===
export async function getAuthors(): Promise<
  ServerActionResponse<AuthorWithPostCount[]>
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
