import { list, del } from "@vercel/blob";

import { prisma } from "@/lib/prisma";
import { BLOB_STORAGE_PREFIXES } from "@/lib";

/*

    This CRON job cleans up unused blog images from blob storage.

*/

export async function GET() {
  // Get all blog avatar URLs from the prisma
  const blogs = await prisma.blogPost.findMany({
    select: { blogImageUrl: true },
  });

  const validUrls = new Set(blogs.map((a) => a.blogImageUrl));
  // Get all blog blobs from storage
  const items = await list({ prefix: BLOB_STORAGE_PREFIXES.BLOGS });

  // Delete unused blobs
  for (const blob of items.blobs) {
    if (!validUrls.has(blob.url)) {
      await del(blob.pathname);
    }
  }

  return Response.json({ cleaned: true });
}
