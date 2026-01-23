import { AdminBlogsForm, AdminHeading } from "@/components/admin";
import { getAuthors } from "@/lib/server/queries";

export default async function Page() {
  // === QUERIES ===
  const authors = await getAuthors();
  const authorList = authors.success ? authors.data : [];

  return (
    <div>
      <AdminHeading heading="Add Blog" />
      <AdminBlogsForm authorList={authorList} />
    </div>
  );
}
