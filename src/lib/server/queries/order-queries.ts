import { Order } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types";
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
