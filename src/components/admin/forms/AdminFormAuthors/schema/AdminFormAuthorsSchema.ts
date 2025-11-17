import { z } from "zod";

// === SCHEMA ===
export const adminFormAuthorsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file?.size > 0, "Image is required")
    .refine((file) => file.size <= 1 * 1024 * 1024, "Max file size is 1MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only JPEG and PNG formats are accepted",
    ),
});

export type AdminFormAuthorsData = z.infer<typeof adminFormAuthorsSchema>;
