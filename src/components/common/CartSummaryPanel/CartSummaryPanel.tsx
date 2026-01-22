import { CartSummary } from "@/types";
import { CheckoutButton } from "@/components/common/CheckoutButton/CheckoutButton";

type CartSummaryPanelProps = {
  summary: CartSummary;
};

export function CartSummaryPanel(props: CartSummaryPanelProps) {
  // === PROPS ===
  const { summary } = props;

  return (
    <div className="w-full lg:w-[40%] lg:sticky lg:top-22 self-start">
      <div className="border border-neutral-5 rounded-sm p-6">
        <h2 className="text-xl font-medium text-neutral-12 mb-6">Summary</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-base">
            <span className="text-neutral-10">Subtotal</span>
            <span className="text-neutral-12 ">{summary.subtotal}</span>
          </div>

          <div className="flex justify-between text-base">
            <span className="text-neutral-10">Estimated Shipping</span>
            <span className="text-neutral-12 ">{summary.shipping}</span>
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

        <CheckoutButton className="w-full" />
      </div>
    </div>
  );
}
