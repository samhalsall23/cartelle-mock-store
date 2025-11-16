import { Prisma } from "@prisma/client";

// === AUTHORS ===
export type AdminTableAuthorQuery = Prisma.AuthorGetPayload<{
  include: { _count: { select: { posts: true } } };
}>;

export type AdminTableAuthorMutation = { id: string };
