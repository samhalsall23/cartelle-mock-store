import { screamingSnakeToTitle } from "@/lib";
import { BlogCategory } from "@prisma/client";

export const BLOG_CATEGORY_OPTIONS = Object.values(BlogCategory).map(
  (category) => ({
    label: screamingSnakeToTitle(category),
    value: category,
  }),
);
