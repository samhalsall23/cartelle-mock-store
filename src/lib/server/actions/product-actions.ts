"use server";

import { revalidatePath } from "next/cache";

import { ProductCategoryEnum } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { prisma } from "@/lib/prisma";
import { ProductMutationInput, ServerActionResponse } from "@/types";
import { adminRoutes, routes } from "@/lib/routing";
import { wrapServerCall } from "../helpers/helpers";
import { SIZE_TEMPLATES } from "@/lib/constants";
import { AdminProductsFormNoFileData } from "@/components/admin/forms/AdminProductsForm/schema";

// === MUTATIONS ===
export async function createProduct(
  data: AdminProductsFormNoFileData,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return wrapServerCall(async () => {
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
  return wrapServerCall(async () => {
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
  return wrapServerCall(async () => {
    const deleted = await prisma.product.delete({ where: { id } });

    revalidatePath(adminRoutes.products);
    revalidatePath(routes.home);
    revalidatePath(routes.shop);

    return { id: deleted.id };
  });
}
