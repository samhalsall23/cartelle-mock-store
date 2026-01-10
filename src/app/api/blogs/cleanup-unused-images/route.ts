import { prisma } from "@/lib/prisma";
import { BLOB_STORAGE_PREFIXES } from "@/lib";
import { cleanupUnusedBlobs } from "@/lib/utils";

/*

    This CRON job cleans up unused blog images from blob storage.

*/

export async function GET() {
  const blogs = await prisma.blogPost.findMany({
    select: { blogImageUrl: true },
  });

  const validUrls = new Set(blogs.map((b) => b.blogImageUrl));

  return cleanupUnusedBlobs({
    prefix: BLOB_STORAGE_PREFIXES.BLOGS,
    validUrls,
    resourceName: "blog",
  });
}
