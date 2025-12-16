import { Prisma } from "@prisma/client";

// === AUTHOR WITH POST COUNT ===
export type AuthorWithPostCount = Prisma.AuthorGetPayload<{
  include: { _count: { select: { posts: true } } };
}>;

// === AUTHOR MUTATION INPUT ===
export type AuthorMutationInput = { id: string };
