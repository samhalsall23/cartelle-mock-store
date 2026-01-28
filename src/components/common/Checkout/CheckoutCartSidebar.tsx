import { CartItemWithDetails, CartSummary } from "@/types";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { calculateMockArrivalDate } from "./utils";

type CheckoutCartSidebarProps = {
  items: CartItemWithDetails[];
  summary: CartSummary;
};

export function CheckoutCartSidebar(props: CheckoutCartSidebarProps) {
  const { items, summary } = props;

  return (
    <div className="w-full md:sticky md:top-22 self-start">
      <div className="border border-neutral-5 rounded-sm p-6">
        <h2 className="text-xl font-medium text-neutral-12 mb-4">
          Order Summary
        </h2>

        {/* Cart Items */}
        <div className="mb-6">
          {items.map((item) => (
            <CheckoutCartItem
              key={item.id}
              item={item}
              arrivalDate={calculateMockArrivalDate()}
            />
          ))}
        </div>

        {/* Summary Section */}
        <div className="space-y-4 pt-4 border-t border-neutral-5">
          <div className="flex justify-between text-base">
            <span className="text-neutral-10">Subtotal</span>
            <span className="text-neutral-12">{summary.subtotal}</span>
          </div>

          <div className="flex justify-between text-base">
            <span className="text-neutral-10">Estimated Shipping</span>
            <span className="text-neutral-12">{summary.shipping}</span>
          </div>

          <div className="border-t border-neutral-5 pt-4">
            <div className="flex justify-between text-lg">
              <span className="text-neutral-11 font-medium">Total</span>
              <span className="text-neutral-11 font-medium">
                {summary.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
