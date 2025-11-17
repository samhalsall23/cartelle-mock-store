"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

export function AdminFormAuthors() {
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
  });

  //

  // === FUNCTIONS ===
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      if (selectedFile.size > 1 * 1024 * 1024) {
        toast.error("File size exceeds 1MB");
        clearFileInput();
        return;
      }
      if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
        toast.error("Only JPEG and PNG formats are accepted");
        clearFileInput();
        return;
      }

      setValue("image", selectedFile, { shouldValidate: true });
      setFile(selectedFile);
    }
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
              Fill in details for the new author below.
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

                {preview && (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="rounded mt-2 object-cover"
                  />
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
