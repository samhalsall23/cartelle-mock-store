import { Order, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { OrderWithCart, ServerActionResponse } from "@/types";
import { wrapServerCall } from "../helpers";

export async function getCurrentOrderById(
  orderId: string,
): Promise<ServerActionResponse<Order | null>> {
  return wrapServerCall(async () => {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    return order;
  });
}

export async function getOrderedOrders(): Promise<
  ServerActionResponse<OrderWithCart[]>
> {
  return wrapServerCall(async () => {
    const orders = await prisma.order.findMany({
      where: { status: OrderStatus.PAID },
      include: {
        cart: {
          include: {
            items: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return orders.map((order) => ({
      ...order,
      totalPrice: Number(order.totalPrice),
      cart: {
        ...order.cart,
        items: order.cart.items.map((item) => ({
          ...item,
          unitPrice: Number(item.unitPrice),
        })),
      },
    }));
  });
}
