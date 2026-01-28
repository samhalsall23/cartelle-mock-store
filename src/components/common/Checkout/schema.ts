import { z } from "zod";

// Delivery Details Schema
export const deliveryDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Valid ZIP code required"),
  country: z.string().min(1, "Country is required"),
});

// Payment Schema
export const paymentSchema = z.object({
  paymentMethod: z.enum(["STRIPE"]),
  stripePaymentIntentId: z.string().optional(),
});

// Combined Checkout Form Schema
export const checkoutFormSchema = deliveryDetailsSchema.merge(paymentSchema);

// TypeScript Types
export type DeliveryDetailsData = z.infer<typeof deliveryDetailsSchema>;
export type PaymentData = z.infer<typeof paymentSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
