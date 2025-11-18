import { getAuthorById } from "@/lib/server";
import { AdminFormAuthors, AdminHeading } from "@/components/admin";

export default async function Page({ params }: { params: { id: string } }) {
  // === PARAMS ===
  const { id } = await params;

  // === DATA FETCHING ===
  const authorData = await getAuthorById(id);

  if (!authorData.success || !authorData.data) {
    return <p>Author not found.</p>;
  }

  return (
    <section>
      <AdminHeading heading="Edit Author" />
      <AdminFormAuthors isEditMode={true} authorData={authorData.data} />
    </section>
  );
}
