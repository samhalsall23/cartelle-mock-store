import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { CheckoutSuccess } from "@/components/common/CheckoutSuccess/CheckoutSuccess";
import { getCurrentOrderById } from "@/lib/server/queries";
import { COOKIE_CART_ID } from "@/lib";

type Props = {
  searchParams: { orderId?: string };
};

export default async function CheckoutSuccessPage(props: Props) {
  // === PROPS ===
  const { orderId } = props.searchParams;

  // === FETCH DATA & REDIRECT ===
  if (!orderId) {
    redirect("/");
  }

  const order = await getCurrentOrderById(orderId);

  if (!order || !order.success || !order.data) {
    redirect("/");
  }

  // === COOKIE CLEANUP ===
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_CART_ID);

  return (
    <div className="container mx-auto">
      <CheckoutSuccess
        orderNumber={order.data.orderNumber?.toString()}
        email={order.data.deliveryEmail || undefined}
      />
    </div>
  );
}
