import { prisma } from "@/lib/prisma";
import { BLOB_STORAGE_PREFIXES } from "@/lib";
import { cleanupUnusedBlobs } from "@/lib/utils";

/*

    This CRON job cleans up unused product images from blob storage.

*/

export async function GET() {
  const products = await prisma.product.findMany({
    select: { images: true },
  });

  const validUrls = new Set(products.flatMap((p) => p.images));

  return cleanupUnusedBlobs({
    prefix: BLOB_STORAGE_PREFIXES.PRODUCTS,
    validUrls,
    resourceName: "product",
  });
}
