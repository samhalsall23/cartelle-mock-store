"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { COOKIE_CART_ID } from "@/lib/constants";
import { ServerActionResponse } from "@/types";
import { wrapServerCall } from "../helpers/helpers";
import { PaymentMethod } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type CreateOrderInput = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: PaymentMethod;
  stripePaymentIntentId?: string;
};

export type CreateOrderOutput = {
  orderNumber: number;
  orderId: string;
};

export async function createOrder(
  input: CreateOrderInput,
): Promise<ServerActionResponse<CreateOrderOutput>> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(COOKIE_CART_ID)?.value;

    if (!cartId) {
      throw new Error("Cart not found");
    }

    // Fetch cart with items
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((sum, item) => {
      return sum.add(item.unitPrice.mul(item.quantity));
    }, new Decimal(0));

    // Format customer address
    const customerAddress = `${input.address}, ${input.city}, ${input.state} ${input.zipCode}, ${input.country}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        cartId: cart.id,
        customerName: input.fullName,
        customerEmail: input.email,
        customerPhone: input.phone,
        customerAddress,
        totalPrice,
        paymentMethod: input.paymentMethod,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
    });

    // Update cart status to ORDERED
    await prisma.cart.update({
      where: { id: cart.id },
      data: { status: "ORDERED" },
    });

    // Clear cart cookie
    cookieStore.delete(COOKIE_CART_ID);

    return {
      orderNumber: order.orderNumber,
      orderId: order.id,
    };
  });
}
