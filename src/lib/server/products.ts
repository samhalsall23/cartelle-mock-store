"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../prisma";
import {
  ProductGetAllCounts,
  ProductMutationInput,
  ServerActionResponse,
} from "@/types";
import { handleServerAction } from "./helpers";
import { adminRoutes, routes } from "../routing";

// === FETCHES ===
export async function getAllProductsWithTotalSold(): Promise<
  ServerActionResponse<ProductGetAllCounts[]>
> {
  return handleServerAction(async () => {
    const products = await prisma.product.findMany({
      include: {
        orderItems: {
          where: {
            order: {
              status: {
                notIn: ["CANCELLED", "REFUNDED"],
              },
            },
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return products.map((product) => {
      // Need to sum up total sold from order items as can order multiple quantities of same product
      const totalSold = product.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      return {
        ...product,
        price: product.price.toNumber(),
        totalSold,
      };
    });
  });
}

// === MUTATIONS ===
export async function deleteProductById(
  id: string,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return handleServerAction(async () => {
    const deleted = await prisma.product.delete({ where: { id } });

    revalidatePath(adminRoutes.products);
    revalidatePath(routes.home);
    revalidatePath(routes.shop);

    return { id: deleted.id };
  });
}
