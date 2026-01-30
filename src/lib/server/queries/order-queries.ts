import { cookies } from "next/headers";

import { Order } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types";
import { wrapServerCall } from "../helpers";
import { COOKIE_CART_ID } from "@/lib/constants";

export async function getCurrentOrder(): Promise<
  ServerActionResponse<Order | null>
> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(COOKIE_CART_ID)?.value;

    const order = await prisma.order.findUnique({
      where: { cartId },
    });

    return order;
  });
}
