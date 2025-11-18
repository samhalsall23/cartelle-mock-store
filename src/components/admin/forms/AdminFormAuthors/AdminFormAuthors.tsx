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
import { AdminFormAuthorsData, adminFormAuthorsSchema } from "./schema";
import { createAuthor } from "@/lib/server";
import { usePreviewUrl } from "@/hooks";

type AdminFormAuthorsProps = {
  isEditMode?: boolean;
  authorData?: Author;
};

export function AdminFormAuthors(props: AdminFormAuthorsProps) {
  // === PROPS ===
  const { isEditMode = false, authorData } = props;

  // === ROUTES ===
  const router = useRouter();

  // === REFS ===
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === STATE ===
  const [file, setFile] = useState<File | null>(null);

  // === HOOKS ===
  const preview = usePreviewUrl(file);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdminFormAuthorsData>({
    resolver: zodResolver(adminFormAuthorsSchema),
    defaultValues: {
      name: authorData?.name,
      occupation: authorData?.occupation,
    },
  });

  // === FUNCTIONS ===
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    const compressedFile = await imageCompression(selectedFile, {
      maxSizeMB: 0.25, // ~250kb
      maxWidthOrHeight: 800,
      useWebWorker: true,
    });

    if (compressedFile.size > 1 * 1024 * 1024) {
      toast.error("Error compressing image. Please choose a smaller file.");
      clearFileInput();
      return;
    }

    if (!["image/jpeg", "image/png"].includes(compressedFile.type)) {
      toast.error("Only JPEG and PNG formats are accepted");
      clearFileInput();
      return;
    }

    setValue("image", compressedFile, { shouldValidate: true });
    setFile(compressedFile);
  };

  const onSubmit = async (data: AdminFormAuthorsData) => {
    const res = await createAuthor(data);

    if (!res.success) {
      toast.error("Error creating author");
      return;
    }

    toast.success("Author created successfully!");
    router.back();
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
        <AdminFieldGroup>
          <AdminFieldSet>
            <AdminFieldDescription>
              {isEditMode
                ? "Edit the author details below."
                : "Fill in details for the new author below."}
            </AdminFieldDescription>

            <AdminFieldGroup>
              {/* NAME */}
              <AdminField>
                <AdminFieldLabel>Name</AdminFieldLabel>
                <AdminInput {...register("name")} />
                <AdminFieldError errors={[errors.name]} />
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
            <AdminButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create Author"}
            </AdminButton>
          </AdminFieldSet>
        </AdminFieldGroup>
      </form>

      <AdminToaster position="top-right" />
    </div>
  );
}
