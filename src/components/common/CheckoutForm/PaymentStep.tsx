"use client";

import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Button } from "@/components/ui";

type PaymentStepProps = {
  onContinue: () => void;
  onEditPaymentRequest: () => void;
  completed: boolean;
};

export function PaymentStep(props: PaymentStepProps) {
  // === PROPS ===
  const { onContinue, onEditPaymentRequest, completed } = props;

  // === STRIPE HOOKS ===
  const stripe = useStripe();
  const elements = useElements();

  // === STATE ===
  const [isValidating, setIsValidating] = useState(false);
  const [paymentMethodType, setPaymentMethodType] = useState<string>("");

  // === FUNCTIONS ===
  const handleContinueToReview = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsValidating(true);

    // Submit the payment element to validate
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setIsValidating(false);
      return;
    }

    setIsValidating(false);
    onContinue();
  };

  const formatPaymentMethodType = (type: string) => {
    const typeMap: Record<string, string> = {
      card: "Credit Card",
      afterpay_clearpay: "Afterpay",
      klarna: "Klarna",
      paypal: "PayPal",
      apple_pay: "Apple Pay",
      google_pay: "Google Pay",
      ideal: "iDEAL",
      sepa_debit: "SEPA Direct Debit",
      us_bank_account: "US Bank Account",
    };
    return (
      typeMap[type] ||
      type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  return (
    <>
      <div className={completed ? "block" : "hidden"}>
        <div className="bg-neutral-02 flex border border-neutral-5 rounded-md justify-between items-start">
          <div className="space-y-1 text-sm text-neutral-10 p-4">
            <p className="text-sm text-neutral-10">
              Payment Method: {formatPaymentMethodType(paymentMethodType)}
            </p>
          </div>
          <button
            onClick={onEditPaymentRequest}
            className="text-sm p-4 text-neutral-12 cursor-pointer font-medium underline"
          >
            Edit
          </button>
        </div>
      </div>

      <div className={completed ? "hidden" : "block"}>
        <PaymentElement
          onChange={(e) => setPaymentMethodType(e?.value?.type || "")}
        />
        <Button
          onClick={handleContinueToReview}
          variant="dark"
          text="Continue to Review"
          className="mt-8 w-full"
          isLoading={isValidating}
        />
      </div>
    </>
  );
}
