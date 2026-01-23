import { AdminHeading, AdminProductsForm } from "@/components/admin";
import { getProductById } from "@/lib/server/queries";

export default async function Page({ params }: { params: { id: string } }) {
  // === PARAMS ===
  const { id } = await params;

  // === QUERIES ===
  const product = await getProductById(id);

  if (!product.success || !product.data) {
    return <p>Product not found.</p>;
  }

  // === PREPARE DATA ===
  const productData = {
    ...product.data,
    price: Number(product.data.price),
  };

  return (
    <div>
      <AdminHeading heading="Edit Product" />
      <AdminProductsForm isEditMode={true} productData={productData} />
    </div>
  );
}
