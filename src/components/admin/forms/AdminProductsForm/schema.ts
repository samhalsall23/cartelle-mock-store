import { ProductCategoryEnum, SizeTypeEnum } from "@prisma/client";
import { z } from "zod";

export const AdminProductsFormSchema = (isEditMode: boolean) =>
  z
    .object({
      name: z.string().min(1, "Product name is required"),
      description: z.string().min(1, "Product description is required"),

      price: z.coerce
        .number("Price must be entered")
        .positive("Price must be a positive number")
        .multipleOf(0.01, "Price must be valid"),

      category: z.enum(
        Object.values(ProductCategoryEnum) as [
          ProductCategoryEnum,
          ...ProductCategoryEnum[],
        ],
        "Category is required",
      ),

      slug: z
        .string()
        .min(1, "Slug is required")
        .regex(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          "Slug must be lowercase with hyphens only",
        ),

      isActive: z.boolean(),

      sizeType: z.enum(SizeTypeEnum, "Choose a size template"),

      images: isEditMode
        ? z.array(z.instanceof(File)).optional()
        : z
            .array(z.instanceof(File), {
              message: "At least two images are required",
            })
            .min(2, { message: "At least two images are required" }),

      imageUrls: z.array(z.string()).optional(),
    })
    .refine(
      (data) => {
        if (isEditMode) {
          const totalImages =
            (data.imageUrls?.length || 0) + (data.images?.length || 0);
          return totalImages >= 2;
        }
        return true;
      },
      {
        message: "At least two images are required",
        path: ["images"],
      },
    );

export type AdminProductsFormData = z.infer<
  ReturnType<typeof AdminProductsFormSchema>
> & {
  imageUrls?: string[];
};

export type AdminProductsFormNoFileData = Omit<AdminProductsFormData, "images">;
