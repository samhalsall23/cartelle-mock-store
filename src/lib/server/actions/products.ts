"use server";

import { revalidatePath } from "next/cache";

import { OrderStatus, Product, ProductCategoryEnum } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { prisma } from "@/lib/prisma";
import {
  ProductGetAllCounts,
  ProductMutationInput,
  ProductWithSizes,
  ServerActionResponse,
} from "@/types";
import { adminRoutes, routes } from "@/lib/routing";
import { handleServerAction } from "../helpers/helpers";
import { AdminProductsFormNoFileData } from "@/components/admin";
import { SIZE_TEMPLATES } from "@/lib/constants";

// === FETCHES ===
export async function getThreeLatestProducts(): Promise<
  ServerActionResponse<Product[]>
> {
  return handleServerAction(async () => {
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
  return handleServerAction(async () => {
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
  return handleServerAction(async () => {
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
  return handleServerAction(async () => {
    const product = await prisma.product.findFirst({
      where: { id },
    });

    return product;
  });
}

export async function getProductBySlug(
  slug: string,
): Promise<ServerActionResponse<ProductWithSizes | null>> {
  return handleServerAction(async () => {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        sizes: true,
      },
    });

    return product;
  });
}

// === MUTATIONS ===
export async function createProduct(
  data: AdminProductsFormNoFileData,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return handleServerAction(async () => {
    const sizes = SIZE_TEMPLATES[data.sizeType].map((size) => ({
      label: size,
      stock: 10, // mock stock value, in real app this would come from form data
    }));

    const created = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: new Decimal(data.price),
        category: data.category as ProductCategoryEnum,
        slug: data.slug,
        isActive: data.isActive,
        images: data.imageUrls,
        sizeType: data.sizeType,

        sizes: {
          create: sizes,
        },
      },
    });

    revalidatePath(adminRoutes.products);
    revalidatePath(routes.home);
    revalidatePath(routes.shop);

    return { id: created.id };
  });
}

export async function updateProductById(
  id: string,
  data: AdminProductsFormNoFileData,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return handleServerAction(async () => {
    const created = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category as ProductCategoryEnum,
        slug: data.slug,
        isActive: data.isActive,
        images: data.imageUrls,
      },
    });

    revalidatePath(adminRoutes.products);
    revalidatePath(routes.home);
    revalidatePath(routes.shop);

    return { id: created.id };
  });
}

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
