import { AdminProductsForm, AdminHeading } from "@/components/admin";

export default async function Page() {
  return (
    <div>
      <AdminHeading heading="Add Product" />
      <AdminProductsForm />
    </div>
  );
}
