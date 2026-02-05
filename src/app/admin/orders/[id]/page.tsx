import { AdminHeading, AdminOrderView } from "@/components/admin";
import { getAdminOrderById } from "@/lib/server/queries";

export default async function Page({ params }: { params: { id: string } }) {
  // === PARAMS ===
  const { id } = await params;

  // === QUERIES ===
  const order = await getAdminOrderById(id);

  if (!order.success || !order.data) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <AdminHeading heading="View Order" />
      <AdminOrderView order={order.data} />
    </div>
  );
}
