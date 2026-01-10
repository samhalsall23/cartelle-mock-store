import { prisma } from "@/lib/prisma";
import { BLOB_STORAGE_PREFIXES } from "@/lib";
import { cleanupUnusedBlobs } from "@/lib/utils";

/*

    This CRON job cleans up unused author images from blob storage.

*/

export async function GET() {
  const authors = await prisma.author.findMany({
    select: { avatarUrl: true },
  });

  const validUrls = new Set(authors.map((a) => a.avatarUrl));

  return cleanupUnusedBlobs({
    prefix: BLOB_STORAGE_PREFIXES.AUTHORS,
    validUrls,
    resourceName: "author",
  });
}
