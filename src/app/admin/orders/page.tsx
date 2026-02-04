import { AdminHeading, AdminOrdersTable } from "@/components/admin";
import { getOrderedOrders } from "@/lib/server/queries";

export default async function Page() {
  // === QUERIES ===
  const orders = await getOrderedOrders();

  if (!orders.success) {
    return <div>Error loading orders: {orders.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Orders" />

      <AdminOrdersTable orders={orders.data} />
    </div>
  );
}
