"use client";

import { useRef, useState } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

import {
  AdminButton,
  AdminField,
  AdminFieldDescription,
  AdminFieldError,
  AdminFieldGroup,
  AdminFieldLabel,
  AdminFieldSet,
  AdminInput,
  AdminToaster,
  AdminTextarea,
  //   AdminCheckbox,
} from "@/components/admin";

import {
  AdminProductsFormData,
  AdminProductsFormSchema,
  AdminFormEditProductsData,
} from "./schema";

import {
  //   createProduct,
  deleteProductById,
  //   updateProductById,
} from "@/lib/server/products";
// import { usePreviewUrl } from "@/hooks";

type AdminProductsFormProps = {
  isEditMode?: boolean;
  productData?: Product;
  categories: Array<{ id: string; name: string }>;
};

export function AdminProductsForm(props: AdminProductsFormProps) {
  // === PROPS ===
  const { isEditMode = false, productData, categories } = props;

  // === ROUTES ===
  const router = useRouter();

  // === REFS ===
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === STATE ===
  const [files, setFiles] = useState<File[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // === HOOKS ===
  const previews = files.map((file) => URL.createObjectURL(file));
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdminProductsFormData>({
    resolver: zodResolver(AdminProductsFormSchema(isEditMode)),
    defaultValues: {
      name: productData?.name,
      description: productData?.description,
      price: productData?.price ? Number(productData.price) : undefined,
      category: productData?.category,
      slug: productData?.slug,
      isActive: productData?.isActive ?? true,
    },
  });

  // === FUNCTIONS ===
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) {
      toast.error("No files selected");
      return;
    }

    const compressedFiles: File[] = [];

    for (const file of selectedFiles) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5, // ~500kb per image
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });

      if (compressedFile.size > 1 * 1024 * 1024) {
        toast.error(
          `Error compressing ${file.name}. Please choose smaller files.`,
        );
        continue;
      }

      if (!["image/jpeg", "image/png"].includes(compressedFile.type)) {
        toast.error(`${file.name}: Only JPEG and PNG formats are accepted`);
        continue;
      }

      compressedFiles.push(compressedFile);
    }

    if (compressedFiles.length === 0) {
      clearFileInput();
      return;
    }

    setValue("images", compressedFiles, { shouldValidate: true });
    setFiles(compressedFiles);
  };

  const onAddSubmit = async (data: AdminProductsFormData) => {
    // if (!data.images || data.images.length === 0) {
    //   toast.error("At least one product image is required");
    //   return;
    // }
    // const payload = {
    //   ...data,
    //   images: data.images,
    // };
    // const addRes = await createProduct(payload);
    // if (!addRes.success) {
    //   toast.error("Error creating product");
    //   return;
    // }
    // toast.success("Product created successfully!");
    // router.back();
  };

  const onEditSubmit = async (data: AdminFormEditProductsData) => {
    // const editRes = await updateProductById(productData?.id || "", data);
    // if (!editRes.success) {
    //   toast.error("Error updating product");
    //   return;
    // }
    // toast.success("Product updated successfully!");
    // router.back();
  };

  const onDelete = async () => {
    if (!productData?.id) return;

    setIsDeleting(true);

    const res = await deleteProductById(productData?.id);

    if (!res.success) {
      setIsDeleting(false);
      toast.error("Error deleting product");
      return;
    }

    toast.success("Product deleted successfully!");
    router.back();
  };

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={
          isEditMode ? handleSubmit(onEditSubmit) : handleSubmit(onAddSubmit)
        }
        className="pt-3"
      >
        <AdminFieldGroup>
          <AdminFieldSet>
            <AdminFieldDescription>
              {isEditMode
                ? "Edit the product details below."
                : "Fill in details for the new product below."}
            </AdminFieldDescription>

            <AdminFieldGroup>
              {/* NAME */}
              <AdminField>
                <AdminFieldLabel>Product Name</AdminFieldLabel>
                <AdminInput {...register("name")} />
                <AdminFieldError errors={[errors.name]} />
              </AdminField>

              {/* DESCRIPTION */}
              <AdminField>
                <AdminFieldLabel>Description</AdminFieldLabel>
                <AdminTextarea {...register("description")} rows={4} />
                <AdminFieldError errors={[errors.description]} />
              </AdminField>

              {/* PRICE */}
              <AdminField>
                <AdminFieldLabel>Price ($)</AdminFieldLabel>
                <AdminInput type="number" step="0.01" {...register("price")} />
                <AdminFieldError errors={[errors.price]} />
              </AdminField>

              {/* SLUG */}
              <AdminField>
                <AdminFieldLabel>Slug</AdminFieldLabel>
                <AdminInput
                  {...register("slug")}
                  placeholder="e.g., organic-cotton-tee"
                />
                <AdminFieldError errors={[errors.slug]} />
              </AdminField>

              {/* CATEGORY */}
              {/* <AdminField>
                <AdminFieldLabel>Category</AdminFieldLabel>
                <select
                  {...register("categoryId")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <AdminFieldError errors={[errors.categoryId]} />
              </AdminField> */}

              {/* IS ACTIVE */}
              <AdminField>
                {/* <div className="flex items-center space-x-2">
                  <AdminCheckbox
                    id="isActive"
                    {...register("isActive")}
                    defaultChecked={watch("isActive")}
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Active (visible in store)
                  </label>
                </div> */}
                <AdminFieldError errors={[errors.isActive]} />
              </AdminField>

              {/* IMAGES */}
              <AdminField>
                <AdminFieldLabel>Product Images</AdminFieldLabel>
                <AdminInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                <AdminFieldError errors={[errors.images]} />

                {(previews.length > 0 || productData?.images.length) && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {previews.length > 0
                      ? previews.map((preview, index) => (
                          <div
                            key={index}
                            className="relative w-full aspect-square"
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, 240px"
                              className="rounded object-cover"
                            />
                          </div>
                        ))
                      : productData?.images.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative w-full aspect-square"
                          >
                            <Image
                              src={imageUrl}
                              alt={`Product image ${index + 1}`}
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, 240px"
                              className="rounded object-cover"
                            />
                          </div>
                        ))}
                  </div>
                )}
              </AdminField>
            </AdminFieldGroup>

            {/* SUBMIT */}
            <div className="flex flex-col gap-3">
              <AdminButton
                className="flex-1"
                type="submit"
                disabled={isSubmitting || isDeleting}
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditMode
                    ? "Save Changes"
                    : "Create Product"}
              </AdminButton>

              {/* Delete Button */}
              {isEditMode && (
                <AdminButton
                  type="button"
                  onClick={onDelete}
                  disabled={isSubmitting || isDeleting}
                  variant="outline"
                  className="flex-1"
                >
                  {isDeleting ? "Deleting..." : "Delete Product"}
                </AdminButton>
              )}
            </div>
          </AdminFieldSet>
        </AdminFieldGroup>
      </form>

      <AdminToaster position="top-right" />
    </div>
  );
}
