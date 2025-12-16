import { Prisma } from "@prisma/client";

// === AUTHORS ===
export type AdminTableAuthorQuery = Prisma.AuthorGetPayload<{
  include: { _count: { select: { posts: true } } };
}>;

export type AdminTableAuthorMutation = { id: string };

// === BLOGS ===
export type AdminTableBlogMutation = { id: string };

export type BlogPostBySlugType = Prisma.BlogPostGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        avatarUrl: true;
        occupation: true;
      };
    };
  };
}>;
