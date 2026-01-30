"use server";

import { cookies } from "next/headers";
import { nanoid } from "nanoid";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/utils/stripe";
import {
  AUD_CURRENCY,
  COOKIE_CART_ID,
  MAX_CART_ITEM_QUANTITY,
  MAX_CART_TOTAL_QUANTITY,
} from "@/lib/constants";
import { Decimal } from "@prisma/client/runtime/library";
import { CartQuantityReturn, ServerActionResponse } from "@/types";
import { wrapServerCall } from "../helpers/helpers";
import { CartStatus, OrderStatus, PaymentMethod, Prisma } from "@prisma/client";

// === QUERIES ===
export async function getCartItemCount(): Promise<
  ServerActionResponse<CartQuantityReturn>
> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();
    const existingCartId = cookieStore.get(COOKIE_CART_ID)?.value;

    if (!existingCartId) {
      return { quantity: 0 };
    }

    const items = await prisma.cartItem.findMany({
      where: { cartId: existingCartId },
      select: { quantity: true },
    });

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return { quantity: totalQuantity };
  });
}

// === SHARED VALIDATION HELPERS ===
function validateItemQuantityLimit(
  currentQuantity: number,
  quantityToAdd: number,
  itemIdentifier?: string,
): number {
  const newItemQuantity = currentQuantity + quantityToAdd;

  if (newItemQuantity > MAX_CART_ITEM_QUANTITY) {
    const identifier = itemIdentifier ? `${itemIdentifier} ` : "";
    throw new Error(
      `Cannot add ${quantityToAdd} more. ${identifier}is limited to ${MAX_CART_ITEM_QUANTITY} per cart. Currently have ${currentQuantity}.`,
    );
  }

  return newItemQuantity;
}

function validateCartTotalLimit(
  otherItemsTotal: number,
  newItemQuantity: number,
): number {
  const newCartTotal = otherItemsTotal + newItemQuantity;

  if (newCartTotal > MAX_CART_TOTAL_QUANTITY) {
    throw new Error(
      `Cart cannot exceed ${MAX_CART_TOTAL_QUANTITY} items total.`,
    );
  }

  return newCartTotal;
}

async function getOtherItemsTotal(
  tx: Prisma.TransactionClient,
  cartId: string,
  excludeItemId?: string,
  excludeProductAndSize?: { productId: string; sizeId: string },
): Promise<number> {
  const where: Prisma.CartItemWhereInput = { cartId };

  if (excludeItemId) {
    where.id = { not: excludeItemId };
  } else if (excludeProductAndSize) {
    where.NOT = {
      AND: {
        productId: excludeProductAndSize.productId,
        sizeId: excludeProductAndSize.sizeId,
      },
    };
  }

  const otherItems = await tx.cartItem.findMany({
    where,
    select: { quantity: true },
  });

  return otherItems.reduce((sum, item) => sum + item.quantity, 0);
}

// === MUTATIONS ===
export async function addToCart({
  productId,
  sizeId,
  quantity,
}: {
  productId: string;
  sizeId: string;
  quantity: number;
}): Promise<ServerActionResponse<CartQuantityReturn>> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();

    const existingCartId = cookieStore.get(COOKIE_CART_ID)?.value;
    const cartId = existingCartId ?? nanoid();

    // Validate input quantity
    if (quantity < 1 || quantity > MAX_CART_ITEM_QUANTITY) {
      throw new Error(
        `Quantity must be between 1 and ${MAX_CART_ITEM_QUANTITY}`,
      );
    }

    const cartQuantity = await prisma.$transaction(async (tx) => {
      // Create cart if it doesn't exist
      if (!existingCartId) {
        await tx.cart.create({
          data: {
            id: cartId,
          },
        });
      }

      const [size, existingItem, otherItemsTotal] = await Promise.all([
        tx.size.findUnique({
          where: { id: sizeId },
          include: { product: true },
        }),

        tx.cartItem.findUnique({
          where: {
            cartId_productId_sizeId: {
              cartId: cartId,
              productId,
              sizeId: sizeId,
            },
          },
          select: { quantity: true },
        }),

        getOtherItemsTotal(tx, cartId, undefined, { productId, sizeId }),
      ]);

      if (!size) {
        throw new Error("Size not found");
      }

      const product = size.product;
      const currentQuantity = existingItem?.quantity ?? 0;

      // Validate per-item quantity limit
      const newItemQuantity = validateItemQuantityLimit(
        currentQuantity,
        quantity,
        product.name,
      );

      // Validate cart total
      const newCartTotal = validateCartTotalLimit(
        otherItemsTotal,
        newItemQuantity,
      );

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
          quantity: newItemQuantity,
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

      return newCartTotal;
    });

    if (!existingCartId) {
      cookieStore.set(COOKIE_CART_ID, cartId, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === "production",
      });
    }

    return { quantity: cartQuantity };
  });
}

export async function updateCartItemQuantity({
  cartItemId,
  quantity,
}: {
  cartItemId: string;
  quantity: number;
}): Promise<ServerActionResponse<CartQuantityReturn>> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();
    const existingCartId = cookieStore.get(COOKIE_CART_ID)?.value;

    if (!existingCartId) {
      throw new Error("Cart not found");
    }

    if (quantity < 1 || quantity > MAX_CART_ITEM_QUANTITY) {
      throw new Error(
        `Quantity must be between 1 and ${MAX_CART_ITEM_QUANTITY}`,
      );
    }

    const cartQuantity = await prisma.$transaction(async (tx) => {
      const [currentItem, otherItemsTotal] = await Promise.all([
        tx.cartItem.findUnique({
          where: { id: cartItemId },
          select: { quantity: true, cartId: true },
        }),
        getOtherItemsTotal(tx, existingCartId, cartItemId),
      ]);

      if (!currentItem || currentItem.cartId !== existingCartId) {
        throw new Error("Cart item not found");
      }

      const newCartTotal = await validateCartTotalLimit(
        otherItemsTotal,
        quantity,
      );

      await tx.cartItem.update({
        where: {
          id: cartItemId,
          cartId: existingCartId,
        },
        data: {
          quantity,
        },
      });

      return newCartTotal;
    });

    return { quantity: cartQuantity };
  });
}

export async function removeCartItem({
  cartItemId,
}: {
  cartItemId: string;
}): Promise<ServerActionResponse<CartQuantityReturn>> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();
    const existingCartId = cookieStore.get(COOKIE_CART_ID)?.value;

    if (!existingCartId) {
      throw new Error("Cart not found");
    }

    const cartQuantity = await prisma.$transaction(async (tx) => {
      await tx.cartItem.delete({
        where: {
          id: cartItemId,
          cartId: existingCartId, // Security check: ensure item belongs to user's cart
        },
      });

      const items = await tx.cartItem.findMany({
        where: { cartId: existingCartId },
        select: { quantity: true },
      });

      return items.reduce((sum, item) => sum + item.quantity, 0);
    });

    return { quantity: cartQuantity };
  });
}
export async function createPaymentIntent(
  status: CartStatus,
): Promise<ServerActionResponse<void>> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(COOKIE_CART_ID)?.value;

    if (!cartId) throw new Error("Cart not found");

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart empty");
    }

    // Prevent duplicate orders
    const existingOrder = await prisma.order.findUnique({
      where: { cartId },
    });

    if (existingOrder?.stripeSessionId) {
      return;
    }

    // Calculate total
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.unitPrice.toNumber() * item.quantity,
      0,
    );

    // Update cart status AFTER validation
    await prisma.cart.update({
      where: { id: cartId },
      data: { status },
    });

    // Create Order
    const order = await prisma.order.create({
      data: {
        cartId,
        totalPrice,
        status: OrderStatus.PENDING,
        paymentMethod: PaymentMethod.STRIPE,
      },
    });

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: AUD_CURRENCY,
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order.id,
        cartId,
      },
    });

    // update with payment intent id
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeSessionId: paymentIntent.client_secret,
      },
    });
  });
}
