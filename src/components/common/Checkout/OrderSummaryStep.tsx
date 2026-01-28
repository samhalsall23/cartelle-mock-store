"use client";

import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "./schema";
import { Button } from "@/components/ui/Button/Button";
import { CartItemWithDetails, CartSummary } from "@/types";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { calculateMockArrivalDate } from "./utils";

type OrderSummaryStepProps = {
  form: UseFormReturn<CheckoutFormData>;
  items: CartItemWithDetails[];
  summary: CartSummary;
  onSubmit: () => void;
  onEditDelivery: () => void;
  onEditPayment: () => void;
  isSubmitting: boolean;
};

export function OrderSummaryStep(props: OrderSummaryStepProps) {
  const {
    form,
    items,
    summary,
    onSubmit,
    onEditDelivery,
    onEditPayment,
    isSubmitting,
  } = props;

  const deliveryData = form.getValues();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-neutral-12 mb-6">
        Review Your Order
      </h2>

      {/* Delivery Details Summary */}
      <div className="bg-neutral-02 border border-neutral-5 rounded-md p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-medium text-neutral-12">
            Delivery Details
          </h3>
          <button
            onClick={onEditDelivery}
            disabled={isSubmitting}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
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

      {/* Payment Method Summary */}
      <div className="bg-neutral-02 border border-neutral-5 rounded-md p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-medium text-neutral-12">
            Payment Method
          </h3>
          <button
            onClick={onEditPayment}
            disabled={isSubmitting}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
          >
            Edit
          </button>
        </div>
        <p className="text-sm text-neutral-10">Credit Card (Stripe)</p>
      </div>

      {/* Order Items */}
      <div className="border border-neutral-5 rounded-md p-4">
        <h3 className="text-base font-medium text-neutral-12 mb-4">
          Order Items
        </h3>
        <div>
          {items.map((item) => (
            <CheckoutCartItem
              key={item.id}
              item={item}
              arrivalDate={calculateMockArrivalDate()}
            />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="border border-neutral-5 rounded-md p-4">
        <h3 className="text-base font-medium text-neutral-12 mb-4">
          Order Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-base">
            <span className="text-neutral-10">Subtotal</span>
            <span className="text-neutral-12">{summary.subtotal}</span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-neutral-10">Estimated Shipping</span>
            <span className="text-neutral-12">{summary.shipping}</span>
          </div>
          <div className="border-t border-neutral-5 pt-3">
            <div className="flex justify-between text-lg">
              <span className="text-neutral-11 font-medium">Total</span>
              <span className="text-neutral-11 font-medium">
                {summary.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="pt-4">
        <Button
          onClick={onSubmit}
          variant="dark"
          text={isSubmitting ? "Placing Order..." : "Place Order"}
          className="w-full"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
