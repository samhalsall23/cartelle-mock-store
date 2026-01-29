import { redirect } from "next/navigation";
import { BaseSection } from "@/components";
import { getCart } from "@/lib/server/queries/cart-queries";
import {
  CheckoutForm,
  CheckoutCartSidebar,
} from "@/components/common/Checkout";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cartResult = await getCart();

  // Redirect to cart if empty
  if (!cartResult.success || cartResult.data.items.length === 0) {
    redirect("/cart");
  }

  const { items, summary } = cartResult.data;

  return (
    <main>
      <BaseSection id="checkout-section" className="pb-16 md:pb-25">
        <div className="flex flex-col gap-6 pt-6 md:pt-10">
          <h1 className="pb-2 md:self-center md:pb-4 font-medium text-3xl">
            Checkout
          </h1>

          {/* Mobile: Cart above, Desktop: Side-by-side */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Cart shown above on mobile only */}
            <div className="md:hidden">
              <CheckoutCartSidebar items={items} summary={summary} />
            </div>

            {/* Form */}
            <div className="w-full md:w-[60%]">
              <CheckoutForm />
            </div>

            {/* Cart sidebar on desktop */}
            <div className="hidden md:block w-full md:w-[40%]">
              <CheckoutCartSidebar items={items} summary={summary} />
            </div>
          </div>
        </div>
      </BaseSection>
    </main>
  );
}
