"use client";

import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "./schema";
import { Button } from "@/components/ui/Button/Button";

type PaymentStepProps = {
  form: UseFormReturn<CheckoutFormData>;
  onContinue: () => void;
  onEditDelivery: () => void;
};

export function PaymentStep(props: PaymentStepProps) {
  const { form, onContinue, onEditDelivery } = props;

  const deliveryData = form.getValues();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-neutral-12 mb-6">Payment</h2>

      {/* Delivery Summary */}
      <div className="bg-neutral-02 border border-neutral-5 rounded-md p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-medium text-neutral-12">
            Delivery Details
          </h3>
          <button
            onClick={onEditDelivery}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
        </div>
        <div className="space-y-1 text-sm text-neutral-10">
          <p>{deliveryData.fullName}</p>
          <p>{deliveryData.email}</p>
          <p>{deliveryData.phone}</p>
          <p>{deliveryData.address}</p>
          <p>
            {deliveryData.city}, {deliveryData.state} {deliveryData.zipCode}
          </p>
          <p>{deliveryData.country}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-medium text-neutral-12 mb-4">
          Payment Method
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border border-neutral-5 rounded-md cursor-pointer hover:bg-neutral-02 transition-colors">
            <input
              type="radio"
              value="STRIPE"
              checked
              readOnly
              {...form.register("paymentMethod")}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-base text-neutral-12 font-medium">
              Credit Card (Stripe)
            </span>
          </label>
        </div>
      </div>

      {/* Stripe Placeholder */}
      <div className="border border-neutral-5 rounded-md p-6 bg-neutral-01">
        <h3 className="text-base font-medium text-neutral-12 mb-4">
          Card Details
        </h3>

        <div className="space-y-4">
          {/* Mock Card Number Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-11 mb-2">
              Card Number
            </label>
            <div className="w-full px-4 py-3 bg-neutral-02 border border-neutral-5 rounded-md text-neutral-09">
              <span className="text-sm">•••• •••• •••• ••••</span>
            </div>
          </div>

          {/* Mock Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-11 mb-2">
                Expiry Date
              </label>
              <div className="w-full px-4 py-3 bg-neutral-02 border border-neutral-5 rounded-md text-neutral-09">
                <span className="text-sm">MM / YY</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-11 mb-2">
                CVC
              </label>
              <div className="w-full px-4 py-3 bg-neutral-02 border border-neutral-5 rounded-md text-neutral-09">
                <span className="text-sm">•••</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-neutral-09 italic">
          Stripe integration placeholder - will be connected to actual Stripe
          Elements
        </p>
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          onClick={onContinue}
          variant="dark"
          text="Continue to Review"
          className="w-full"
        />
      </div>
    </div>
  );
}
