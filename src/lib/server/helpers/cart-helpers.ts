import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CartStatus } from "@prisma/client";
import { CACHE_TAG_CART } from "@/lib/constants/cache-tags";

export const getCartCountCached = unstable_cache(
  async (cartId: string) => {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      select: { status: true },
    });

    if (!cart || cart.status === CartStatus.ORDERED) {
      return { quantity: 0, status: cart?.status ?? null };
    }

    const items = await prisma.cartItem.findMany({
      where: { cartId },
      select: { quantity: true },
    });

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return { quantity: totalQuantity, status: cart.status };
  },
  [CACHE_TAG_CART, "item-count"],
  {
    tags: [CACHE_TAG_CART],
  },
);
