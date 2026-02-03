import { redirect } from "next/navigation";

import { CheckoutSuccess } from "@/components/common/CheckoutSuccess/CheckoutSuccess";
import { getCurrentOrderById } from "@/lib/server/queries";

type Props = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function CheckoutSuccessPage(props: Props) {
  // === PROPS ===
  const searchParams = await props.searchParams;
  const { orderId } = searchParams;

  // === FETCH DATA & REDIRECT ===
  if (!orderId) {
    redirect("/");
  }

  const order = await getCurrentOrderById(orderId);

  if (!order || !order.success || !order.data) {
    redirect("/");
  }

  return (
    <div className="container mx-auto">
      <CheckoutSuccess
        orderNumber={order.data.orderNumber?.toString()}
        email={order.data.deliveryEmail || undefined}
      />
    </div>
  );
}
