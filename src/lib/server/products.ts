"use server";

import { revalidatePath } from "next/cache";

import { OrderStatus, ProductCategoryEnum } from "@prisma/client";

import { prisma } from "../prisma";
import {
  ProductGetAllCounts,
  ProductGetByIdResponse,
  ProductMutationInput,
  ServerActionResponse,
} from "@/types";
import { adminRoutes, routes } from "../routing";
import { handleServerAction } from "./helpers";
import { AdminProductsFormNoFileData } from "@/components/admin";

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
                notIn: [OrderStatus.CANCELLED, OrderStatus.REFUNDED],
              },
            },
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

export async function getProductById(
  id: string,
): Promise<ServerActionResponse<ProductGetByIdResponse | null>> {
  return handleServerAction(async () => {
    const product = await prisma.product.findFirst({
      where: { id },
    });

    return product;
  });
}

export async function getProductBySlug(
  slug: string,
): Promise<ServerActionResponse<ProductGetByIdResponse | null>> {
  return handleServerAction(async () => {
    const product = await prisma.product.findFirst({
      where: { slug },
    });

    return product;
  });
}

// === MUTATIONS ===
export async function createProduct(
  data: AdminProductsFormNoFileData,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return handleServerAction(async () => {
    const created = await prisma.product.create({
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
