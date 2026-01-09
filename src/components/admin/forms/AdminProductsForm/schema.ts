import { ProductCategoryEnum } from "@prisma/client";
import { z } from "zod";

export const AdminProductsFormSchema = (isEditMode: boolean) =>
  z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z
      .number()
      .positive("Price must be greater than 0")
      .multipleOf(0.01, "Price can have at most 2 decimal places"),
    category: z
      .string()
      .min(1, "Category is required")
      .refine(
        (val) =>
          Object.values(ProductCategoryEnum).includes(
            val as ProductCategoryEnum,
          ),
        {
          message: "Invalid category",
        },
      ),
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase with hyphens only",
      ),
    isActive: z.boolean(),
    images: isEditMode
      ? z.array(z.instanceof(File)).optional()
      : z
          .array(z.instanceof(File))
          .min(2, "At least two product images are required"),
  });

export type AdminProductsFormData = z.infer<
  ReturnType<typeof AdminProductsFormSchema>
>;

export type AdminFormEditProductsData = Omit<
  AdminProductsFormData,
  "images"
> & {
  images?: File[];
};
