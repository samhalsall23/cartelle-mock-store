"use server";

import { cookies } from "next/headers";
import { nanoid } from "nanoid";

import { prisma } from "@/lib/prisma";
import { COOKIE_CART_ID } from "../constants";
import { Decimal } from "@prisma/client/runtime/library";
import { CartAddMutationQuantity, ServerActionResponse } from "@/types";

// === MUTATIONS ===
export async function addToCart({
  productId,
  sizeId,
  quantity,
}: {
  productId: string;
  sizeId: string;
  quantity: number;
}): Promise<ServerActionResponse<CartAddMutationQuantity>> {
  const cookieStore = await cookies();

  const existingCartId = cookieStore.get(COOKIE_CART_ID)?.value;
  const cartId = existingCartId ?? nanoid();

  const cartQuantity = await prisma.$transaction(async (tx) => {
    // Create cart if it doesn't exist
    if (!existingCartId) {
      await tx.cart.create({
        data: {
          id: cartId,
        },
      });
    }

    // Fetch product and size server-side
    // Better securiity than trusting client input
    const size = await tx.size.findUnique({
      where: { id: sizeId },
      include: { product: true },
    });

    if (!size) {
      throw new Error("Size not found");
    }

    const product = size.product;

    // Add or update cart item
    await tx.cartItem.upsert({
      where: {
        cartId_productId_sizeId: {
          cartId: cartId,
          productId,
          sizeId: sizeId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        cartId: cartId,
        productId: product.id,
        sizeId,
        quantity,
        unitPrice: new Decimal(product.price),
        title: product.name,
        image: product.images[0],
      },
    });

    // Calculate total quantity in cart for dialog display
    const items = await tx.cartItem.findMany({
      where: { cartId },
      select: { quantity: true },
    });

    return items.reduce((sum, item) => sum + item.quantity, 0);
  });

  // Only set cookie if transaction succeeded and cartId did not exist
  if (!existingCartId) {
    cookieStore.set(COOKIE_CART_ID, cartId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production",
    });
  }

  return {
    success: true,
    data: { quantity: cartQuantity },
  };
}
