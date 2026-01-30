"use client";

import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "./schema";

type PaymentStepProps = {
  form: UseFormReturn<CheckoutFormData>;
  orderId: string;
  stripeSessionId: string;
};

export function PaymentStep(props: PaymentStepProps) {
  const { form } = props;

  return <></>;
}
