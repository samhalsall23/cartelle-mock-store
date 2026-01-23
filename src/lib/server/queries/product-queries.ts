import {
  ProductGetAllCounts,
  ProductWithSizes,
  ServerActionResponse,
} from "@/types";
import { OrderStatus, Product, ProductCategoryEnum } from "@prisma/client";
import { wrapServerCall } from "../helpers";
import { prisma } from "@/lib/prisma";

// === FETCHES ===
export async function getThreeLatestProducts(): Promise<
  ServerActionResponse<Product[]>
> {
  return wrapServerCall(async () => {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    return products;
  });
}

export async function getProductsByCategory(
  category?: string,
): Promise<ServerActionResponse<Product[]>> {
  return wrapServerCall(async () => {
    const products = await prisma.product.findMany({
      where: category
        ? { category: category as ProductCategoryEnum, isActive: true }
        : { isActive: true },
    });

    return products;
  });
}

export async function getAllProductsWithTotalSold(): Promise<
  ServerActionResponse<ProductGetAllCounts[]>
> {
  return wrapServerCall(async () => {
    const products = await prisma.product.findMany({
      include: {
        cartItems: {
          include: {
            cart: {
              include: {
                order: {
                  select: {
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return products.map((product) => {
      // Sum up total sold from cart items where cart has an order that's not cancelled/refunded
      const totalSold = product.cartItems.reduce((sum, item) => {
        const order = item.cart.order;
        if (
          order &&
          order.status !== OrderStatus.CANCELLED &&
          order.status !== OrderStatus.REFUNDED
        ) {
          return sum + item.quantity;
        }
        return sum;
      }, 0);

      return {
        ...product,
        price: product.price.toNumber(),
        totalSold,
      };
    });
  });
}

export async function getProductById(
  id: string,
): Promise<ServerActionResponse<Product | null>> {
  return wrapServerCall(async () => {
    const product = await prisma.product.findFirst({
      where: { id },
    });

    return product;
  });
}

export async function getProductBySlug(
  slug: string,
): Promise<ServerActionResponse<ProductWithSizes | null>> {
  return wrapServerCall(async () => {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        sizes: true,
      },
    });

    return product;
  });
}
