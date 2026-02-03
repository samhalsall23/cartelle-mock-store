"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Button } from "@/components/ui";
import { cn } from "@/lib";

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
  const [isValidating, setIsValidating] = useState<boolean>(false);
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
    <div className="space-y-4">
      {/* === SUMMARY (COMPLETED STATE) === */}
      <motion.div
        animate={{
          opacity: completed ? 1 : 0,
          height: completed ? "auto" : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-neutral-02 overflow-hidden flex border border-neutral-5 rounded-md justify-between items-start"
      >
        <div className="space-y-1 text-sm text-neutral-10 p-4">
          <p>Payment Method: {formatPaymentMethodType(paymentMethodType)}</p>
        </div>

        <button
          onClick={onEditPaymentRequest}
          className="text-sm p-4 text-neutral-12 cursor-pointer font-medium underline"
        >
          Edit
        </button>
      </motion.div>

      {/* === PAYMENT FORM === */}
      <motion.div
        className={cn(
          "overflow-hidden ",
          completed ? "pointer-events-none" : "pointer-events-auto",
        )}
        animate={{
          opacity: completed ? 0 : 1,
          height: completed ? 0 : "auto",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
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
      </motion.div>
    </div>
  );
}
