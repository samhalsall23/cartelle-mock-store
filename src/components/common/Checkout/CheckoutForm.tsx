"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CheckoutStep } from "@/types/checkout";
import { CartItemWithDetails, CartSummary } from "@/types";
import { checkoutFormSchema, CheckoutFormData } from "./schema";
import { CheckoutStepper } from "./CheckoutStepper";
import { DeliveryDetailsStep } from "./DeliveryDetailsStep";
import { PaymentStep } from "./PaymentStep";
import { OrderSummaryStep } from "./OrderSummaryStep";
import { createOrder } from "@/lib/server/actions/order-actions";

type CheckoutFormProps = {
  items: CartItemWithDetails[];
  summary: CartSummary;
};

export function CheckoutForm(props: CheckoutFormProps) {
  const { items, summary } = props;

  // State
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Router
  const router = useRouter();

  // Form setup
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      paymentMethod: "STRIPE",
      stripePaymentIntentId: "",
    },
  });

  // Navigation handlers
  const handleContinueToPayment = async () => {
    // Validate delivery fields
    const isValid = await form.trigger([
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ]);

    if (isValid) {
      setCompletedSteps((prev) => new Set(prev).add(1));
      setCurrentStep(2);
    }
  };

  const handleContinueToReview = async () => {
    // Validate payment fields
    const isValid = await form.trigger(["paymentMethod"]);

    if (isValid) {
      setCompletedSteps((prev) => new Set(prev).add(2));
      setCurrentStep(3);
    }
  };

  const handleEditDelivery = () => {
    setCurrentStep(1);
  };

  const handleEditPayment = () => {
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    const isValid = await form.trigger();

    if (!isValid) {
      toast.error("Please check your information and try again");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = form.getValues();

      const result = await createOrder({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        stripePaymentIntentId: formData.stripePaymentIntentId,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to place order");
        return;
      }

      toast.success(
        `Order #${result.data.orderNumber} placed successfully!`,
      );

      // Redirect to home page (or order confirmation page in the future)
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Order placement error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Step Indicator */}
      <CheckoutStepper
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      {/* Step Content */}
      {currentStep === 1 && (
        <DeliveryDetailsStep form={form} onContinue={handleContinueToPayment} />
      )}

      {currentStep === 2 && (
        <PaymentStep
          form={form}
          onContinue={handleContinueToReview}
          onEditDelivery={handleEditDelivery}
        />
      )}

      {currentStep === 3 && (
        <OrderSummaryStep
          form={form}
          items={items}
          summary={summary}
          onSubmit={handlePlaceOrder}
          onEditDelivery={handleEditDelivery}
          onEditPayment={handleEditPayment}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
