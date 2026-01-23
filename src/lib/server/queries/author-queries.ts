import { prisma } from "@/lib/prisma";
import { AuthorWithPostCount, ServerActionResponse } from "@/types";
import { Author } from "@prisma/client";
import { wrapServerCall } from "@/lib/server/helpers";

// === FETCHES ===
export async function getAuthors(): Promise<
  ServerActionResponse<AuthorWithPostCount[]>
> {
  return wrapServerCall(() =>
    prisma.author.findMany({
      include: { _count: { select: { posts: true } } },
    }),
  );
}

export async function getAuthorById(
  id: string,
): Promise<ServerActionResponse<Author | null>> {
  return wrapServerCall(() =>
    prisma.author.findUnique({
      where: { id },
    }),
  );
}
