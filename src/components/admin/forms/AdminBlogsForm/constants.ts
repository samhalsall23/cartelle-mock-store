import { BlogCategory } from "@prisma/client";

export const BLOG_CATEGORY_OPTIONS = Object.values(BlogCategory).map(
  (category) => ({
    label: category
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    value: category,
  }),
);
