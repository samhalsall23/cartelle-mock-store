"use client";

import { useRef, useState } from "react";
import { Author } from "@prisma/client";
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
} from "@/components/admin";

import { createAuthor, deleteAuthorById, updateAuthorById } from "@/lib/server";
import { usePreviewUrl } from "@/hooks";
import { AdminBlogsFormData, AdminBlogsFormSchema } from "./schema";

type AdminAuthorsFormProps = {
  isEditMode?: boolean;
  authorData?: Author;
};

export function AdminAuthorsForm(props: AdminAuthorsFormProps) {
  // === PROPS ===
  const { isEditMode = false, authorData } = props;

  // === ROUTES ===
  const router = useRouter();

  // === REFS ===
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === STATE ===
  const [file, setFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // === HOOKS ===
  const preview = usePreviewUrl(file);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdminBlogsFormData>({
    resolver: zodResolver(AdminBlogsFormSchema(isEditMode)),
    defaultValues: {
      // enter default values here
    },
  });

  // === FUNCTIONS ===
  //   const clearFileInput = () => {
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = "";
  //     }
  //   };

  //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const selectedFile = e.target.files?.[0] || null;

  //     if (!selectedFile) {
  //       toast.error("No file selected");
  //       return;
  //     }

  //     const compressedFile = await imageCompression(selectedFile, {
  //       maxSizeMB: 0.25, // ~250kb
  //       maxWidthOrHeight: 800,
  //       useWebWorker: true,
  //     });

  //     if (compressedFile.size > 1 * 1024 * 1024) {
  //       toast.error("Error compressing image. Please choose a smaller file.");
  //       clearFileInput();
  //       return;
  //     }

  //     if (!["image/jpeg", "image/png"].includes(compressedFile.type)) {
  //       toast.error("Only JPEG and PNG formats are accepted");
  //       clearFileInput();
  //       return;
  //     }

  //     setValue("image", compressedFile, { shouldValidate: true });
  //     setFile(compressedFile);
  //   };

  //   const onAddSubmit = async (data: AdminAuthorsFormData) => {
  //     if (!data.image) {
  //       toast.error("Image is required");
  //       return;
  //     }

  //     const payload = {
  //       ...data,
  //       image: data.image,
  //     };

  //     const addRes = await createAuthor(payload);

  //     if (!addRes.success) {
  //       toast.error("Error creating author");
  //       return;
  //     }

  //     toast.success("Author created successfully!");
  //     router.back();
  //   };

  //   const onEditSubmit = async (data: AdminFormEditAuthorsData) => {
  //     // debugger;
  //     console.log(authorData?.id, data);
  //     const editRes = await updateAuthorById(authorData?.id || "", data);

  //     if (!editRes.success) {
  //       toast.error("Error updating author");
  //       return;
  //     }

  //     toast.success("Author updated successfully!");
  //     router.back();
  //   };

  //   const onDelete = async () => {
  //     if (!authorData?.id) return;

  //     setIsDeleting(true);

  //     const res = await deleteAuthorById(authorData?.id);

  //     if (!res.success) {
  //       setIsDeleting(false);
  //       toast.error("Error deleting author");
  //       return;
  //     }

  //     toast.success("Author deleted successfully!");
  //     router.back();
  //   };

  return (
    <div className="w-full max-w-md">
      <form
        // onSubmit={
        //   isEditMode ? handleSubmit(onEditSubmit) : handleSubmit(onAddSubmit)
        // }
        className="pt-3"
      >
        <AdminFieldGroup>
          <AdminFieldSet>
            <AdminFieldDescription>
              {isEditMode
                ? "Edit the blog details below."
                : "Fill in details for the new blog below."}
            </AdminFieldDescription>

            <AdminFieldGroup>
              {/* TITLE */}
              <AdminField>
                <AdminFieldLabel>Title</AdminFieldLabel>
                <AdminInput {...register("title")} />
                <AdminFieldError errors={[errors.title]} />
              </AdminField>

              {/* OCCUPATION */}
              <AdminField>
                <AdminFieldLabel>Occupation</AdminFieldLabel>
                <AdminInput {...register("occupation")} />
                <AdminFieldError errors={[errors.occupation]} />
              </AdminField>

              {/* IMAGE */}
              <AdminField>
                <AdminFieldLabel>Profile Image</AdminFieldLabel>

                <AdminInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <AdminFieldError errors={[errors.image]} />

                {(preview || authorData?.avatarUrl) && (
                  <div className="relative w-60! h-60 mt-2">
                    <Image
                      src={preview || authorData?.avatarUrl || ""}
                      alt="Preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 240px"
                      loading="eager"
                      className="rounded object-cover"
                    />
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
                    : "Create Author"}
              </AdminButton>

              {/* Delete Button */}
              {isEditMode && (
                <AdminButton
                  type="button" // Prevents form submission
                  onClick={onDelete}
                  disabled={isSubmitting || isDeleting}
                  variant="outline"
                  className="flex-1"
                >
                  {isDeleting ? "Deleting..." : "Delete Author"}
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
