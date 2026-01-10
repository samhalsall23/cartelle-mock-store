"use client";

import { useMemo, useRef, useState } from "react";
import { Product, ProductCategoryEnum } from "@prisma/client";
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
  AdminSelect,
  AdminSelectTrigger,
  AdminSelectValue,
  AdminSelectContent,
  AdminSelectGroup,
  AdminSelectItem,
  AdminCheckbox,
} from "@/components/admin";

import { AdminProductsFormData, AdminProductsFormSchema } from "./schema";

import { roundToTwoDecimals, STORE_COLLECTIONS, API_ROUTES } from "@/lib";
import {
  createProduct,
  deleteProductById,
  updateProductById,
} from "@/lib/server";
import { usePreviewUrls } from "@/hooks";
import { CloseIcon } from "@/components/icons";

type AdminProductsFormProps = {
  isEditMode?: boolean;
  productData?: Omit<Product, "price"> & { price: number };
};

export function AdminProductsForm(props: AdminProductsFormProps) {
  // === PROPS ===
  const { isEditMode = false, productData } = props;

  // === ROUTES ===
  const router = useRouter();

  // === REFS ===
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === STATE ===
  const [files, setFiles] = useState<File[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>(
    productData?.images || [],
  );

  // === HOOKS ===
  const sessionPreviewUrls = usePreviewUrls(files);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AdminProductsFormSchema(isEditMode)),
    defaultValues: {
      name: productData?.name,
      description: productData?.description,
      price: productData?.price
        ? Number(productData.price).toFixed(2)
        : undefined,
      category: productData?.category,
      slug: productData?.slug,
      isActive: productData?.isActive ?? true,
    },
  });

  // === MEMOS ===
  const previewUrls = useMemo(() => {
    if (!productData) {
      return sessionPreviewUrls;
    }
    return [...existingImageUrls, ...sessionPreviewUrls];
  }, [sessionPreviewUrls, existingImageUrls, productData]);

  // === WATCHERS ===
  const categoryValue = watch("category");
  const isActiveValue = watch("isActive");

  // === FUNCTIONS ===
  const handleRemoveImage = (index: number, previewUrl: string) => {
    // TO DO: Refactor to not calculate offset
    if (existingImageUrls.includes(previewUrl)) {
      setExistingImageUrls((prev) => prev.filter((url) => url !== previewUrl));
      return;
    }

    const offsetPreExistingCount = index - (productData?.images.length || 0);
    const newFiles = files.filter((_, i) => i !== offsetPreExistingCount);

    setFiles(newFiles);
    setValue("images", newFiles.length > 0 ? newFiles : undefined, {
      shouldValidate: true,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) {
      toast.error("No files selected");
      return;
    }

    const compressionPromises = selectedFiles.map(async (file) => {
      try {
        const compressedBlob = await imageCompression(file, {
          maxSizeMB: 1, // 1MB
          maxWidthOrHeight: 1920, // Full HD width for zoom and large displays
          useWebWorker: true,
        });

        if (compressedBlob.size > 1 * 1024 * 1024) {
          toast.error(
            `Error compressing ${file.name}. Please choose smaller files.`,
          );
          return null;
        }

        if (!["image/jpeg", "image/png"].includes(compressedBlob.type)) {
          toast.error(`${file.name}: Only JPEG and PNG formats are accepted`);
          return null;
        }

        return new File([compressedBlob], file.name, {
          type: compressedBlob.type,
          lastModified: Date.now(),
        });
      } catch {
        toast.error(`Failed to compress ${file.name}`);
        return null;
      }
    });

    const compressionResults = await Promise.all(compressionPromises);

    const compressedFiles: File[] = [];

    compressionResults.forEach((file) => {
      if (file) {
        compressedFiles.push(file);
      }
    });

    if (compressedFiles.length === 0) {
      return;
    }

    const updatedFiles = [...files, ...compressedFiles];

    setValue("images", updatedFiles, {
      shouldValidate: true,
    });
    setFiles(updatedFiles);
  };

  const handleProductSubmit = async ({
    data,
    isEdit = false,
    productId,
    existingImageUrls = [],
  }: {
    data: AdminProductsFormData;
    isEdit?: boolean;
    productId?: string;
    existingImageUrls?: string[];
  }) => {
    if (!isEdit && !data.images?.length) {
      return toast.error("Please select at least one image");
    }

    try {
      let uploadedUrls: string[] = [];

      if (data.images?.length) {
        const fd = new FormData();
        data.images.forEach((file) => fd.append("files", file));

        const uploadRes = await fetch(API_ROUTES.PRODUCTS.UPLOAD, {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const { urls } = await uploadRes.json();

        if (
          !Array.isArray(urls) ||
          urls.length === 0 ||
          urls.some((url) => !url)
        ) {
          throw new Error("No valid URLs returned from upload");
        }

        uploadedUrls = urls;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { images, ...dataNoFiles } = data;
      const allImageUrls = isEdit
        ? [...existingImageUrls, ...uploadedUrls]
        : uploadedUrls;

      const result = isEdit
        ? await updateProductById(productId || "", {
            ...dataNoFiles,
            imageUrls: allImageUrls,
          })
        : await createProduct({ ...dataNoFiles, imageUrls: allImageUrls });

      if (!result.success) {
        throw new Error(
          isEdit ? "Failed to update product" : "Failed to create product",
        );
      }

      toast.success(
        isEdit
          ? "Product updated successfully!"
          : "Product created successfully!",
      );
      router.back();
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  const onAddSubmit = (data: AdminProductsFormData) =>
    handleProductSubmit({ data });

  const onEditSubmit = (data: AdminProductsFormData) =>
    handleProductSubmit({
      data,
      isEdit: true,
      productId: productData?.id,
      existingImageUrls: existingImageUrls || [],
    });

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
                <AdminFieldLabel htmlFor="productName">Name</AdminFieldLabel>
                <AdminInput id="productName" {...register("name")} />
                <AdminFieldError errors={[errors.name]} />
              </AdminField>

              {/* DESCRIPTION */}
              <AdminField>
                <AdminFieldLabel htmlFor="productDescription">
                  Description
                </AdminFieldLabel>
                <AdminTextarea
                  id="productDescription"
                  {...register("description")}
                  rows={4}
                />
                <AdminFieldError errors={[errors.description]} />
              </AdminField>

              {/* PRICE */}
              <AdminField>
                <AdminFieldLabel htmlFor="price">Price ($)</AdminFieldLabel>
                <AdminInput
                  id="price"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  {...register("price", {
                    setValueAs: (v) => (v === "" ? undefined : parseFloat(v)),
                    onBlur: (e) => {
                      const v = e.target.value;
                      if (!v) return;
                      const rounded = roundToTwoDecimals(parseFloat(v));
                      setValue("price", rounded, { shouldValidate: true });
                      e.target.value = rounded.toFixed(2);
                    },
                  })}
                />
                <AdminFieldError errors={[errors.price]} />
              </AdminField>

              {/* IMAGES */}
              <AdminField>
                <AdminFieldLabel htmlFor="productImages">
                  Product Images
                </AdminFieldLabel>
                <AdminInput
                  id="productImages"
                  className="hidden"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                <AdminButton
                  className="w-fit!"
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Files
                </AdminButton>
                {previewUrls.length > 0 && (
                  <AdminFieldDescription>
                    {previewUrls.length}{" "}
                    {previewUrls.length === 1 ? "file" : "files"} selected
                  </AdminFieldDescription>
                )}
                <AdminFieldError errors={[errors.images]} />

                {(previewUrls.length > 0 || productData?.images.length) && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {previewUrls.map((preview, index) => (
                      <div
                        key={index}
                        className="relative w-full aspect-square group"
                      >
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          priority
                          quality={60}
                          sizes="(max-width: 768px) 100vw, 240px"
                          className="rounded object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index, preview)}
                          className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-black backdrop-blur-sm text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                          aria-label="Remove image"
                        >
                          <CloseIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </AdminField>
            </AdminFieldGroup>

            {/* SLUG */}
            <AdminField>
              <AdminFieldLabel htmlFor="productSlug">Slug</AdminFieldLabel>
              <AdminInput
                id="productSlug"
                {...register("slug")}
                placeholder="e.g., organic-cotton-tee"
              />
              <AdminFieldError errors={[errors.slug]} />
            </AdminField>

            {/* CATEGORY */}
            <AdminField>
              <AdminFieldLabel htmlFor="productCategory">
                Category
              </AdminFieldLabel>
              <AdminSelect
                value={categoryValue ?? ""}
                onValueChange={(val) =>
                  setValue("category", val as ProductCategoryEnum, {
                    shouldValidate: true,
                  })
                }
              >
                <AdminSelectTrigger id="productCategory" className="w-[180px]">
                  <AdminSelectValue />
                </AdminSelectTrigger>
                <AdminSelectContent>
                  <AdminSelectGroup>
                    {STORE_COLLECTIONS.map((category) => (
                      <AdminSelectItem key={category.id} value={category.id}>
                        {category.name}
                      </AdminSelectItem>
                    ))}
                  </AdminSelectGroup>
                </AdminSelectContent>
              </AdminSelect>
              <AdminFieldError errors={[errors.category]} />
            </AdminField>

            {/* IS ACTIVE */}
            <AdminField>
              <AdminFieldLabel htmlFor="isActive">Active</AdminFieldLabel>
              <div>
                <AdminCheckbox
                  id="isActive"
                  className="w-4"
                  checked={isActiveValue}
                  onCheckedChange={(checked) =>
                    setValue("isActive", checked as boolean)
                  }
                />
              </div>
              <AdminFieldError errors={[errors.isActive]} />
            </AdminField>

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
