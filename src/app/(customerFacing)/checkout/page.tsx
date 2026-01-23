import { BaseSection } from "@/components";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <main>
      <BaseSection id="checkout-section" className="pb-16 md:pb-25">
        <div className="flex flex-col gap-6 pt-6 md:pt-10">
          <h1 className="pb-2 md:pb-4 font-medium text-3xl md:text-4xl xl:text-5xl">
            Checkout
          </h1>
        </div>
      </BaseSection>
    </main>
  );
}
