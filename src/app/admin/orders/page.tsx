import type { Metadata } from "next";

import {
  AdminHeading,
  AdminOrdersTable,
  AdminOrdersToast,
} from "@/components/admin";
import { getOrderedOrders } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Page() {
  // === QUERIES ===
  const orders = await getOrderedOrders();

  if (!orders.success) {
    return <div>Error loading orders: {orders.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Orders" />
      <AdminOrdersToast />
      <AdminOrdersTable orders={orders.data} />
    </div>
  );
}
