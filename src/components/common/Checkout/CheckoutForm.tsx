"use client";

import { Activity, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CheckoutStep } from "@/types/checkout";
import { checkoutFormSchema, CheckoutFormData } from "./schema";
import { DeliveryDetailsStep } from "./DeliveryDetailsStep";
import { PaymentStep } from "./PaymentStep";
import { OrderSummaryStep } from "./OrderSummaryStep";
import { createOrder } from "@/lib/server/actions/order-actions";
import { CircleCheckIcon } from "@/components/icons";
import { cn } from "@/lib";
import { Button } from "@/components/ui";

type CheckoutFormComponentProps = {
  id: string;
  currentStep: number;
  children: React.ReactNode;
  header: string;
  completed: boolean;
  btnText: string;
  onBtnClick: () => void;
  isSubmitting?: boolean;
};

function CheckoutFormComponent(props: CheckoutFormComponentProps) {
  // === PROPS ===
  const {
    children,
    header,
    completed,
    btnText,
    onBtnClick,
    id,
    currentStep,
    isSubmitting,
  } = props;

  return (
    <div
      className={cn(
        "flex py-6  flex-col",
        completed && id === "1" && "border-y border-neutral-5",
        completed && id === "2" && "border-b border-neutral-5",
      )}
    >
      <div className={"flex items-center justify-between mb-4"}>
        <h2 className="text-2xl font-medium text-neutral-12 ">{header}</h2>
        {completed && <CircleCheckIcon />}
      </div>
      {children}
      {currentStep?.toString() === id && (
        <div className="pt-8">
          <Button
            onClick={onBtnClick}
            variant="dark"
            text={btnText}
            className="w-full"
            isLoading={isSubmitting}
          />
        </div>
      )}
    </div>
  );
}

export function CheckoutForm() {
  // === STATE ===
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === ROUTER ===
  const router = useRouter();

  // === FORM SETUP ===
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
      setCurrentStep(2);
    }
  };

  const handleContinueToReview = async () => {
    // Validate payment fields
    const isValid = await form.trigger(["paymentMethod"]);

    if (isValid) {
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

      toast.success(`Order #${result.data.orderNumber} placed successfully!`);

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
      {/* Delivery Details Step */}
      <CheckoutFormComponent
        id="1"
        currentStep={currentStep}
        header="Delivery Details"
        completed={currentStep !== 1}
        btnText="Continue to Payment"
        onBtnClick={handleContinueToPayment}
      >
        <DeliveryDetailsStep
          form={form}
          completed={currentStep !== 1}
          onEditDelivery={handleEditDelivery}
        />
      </CheckoutFormComponent>

      {/* Payment Step */}
      <CheckoutFormComponent
        id="2"
        currentStep={currentStep}
        header="Payment"
        completed={currentStep > 2}
        btnText="Continue to Review"
        onBtnClick={handleContinueToReview}
      >
        <Activity mode={currentStep === 2 ? "visible" : "hidden"}>
          <PaymentStep form={form} />
        </Activity>
      </CheckoutFormComponent>

      {/* Order Summary Step */}
      <CheckoutFormComponent
        id="3"
        currentStep={currentStep}
        header="Order Summary"
        completed={currentStep > 3}
        btnText="Submit Payment"
        onBtnClick={handlePlaceOrder}
        isSubmitting={isSubmitting}
      >
        <Activity mode={currentStep === 3 ? "visible" : "hidden"}>
          <OrderSummaryStep />
        </Activity>
      </CheckoutFormComponent>
    </div>
  );
}
