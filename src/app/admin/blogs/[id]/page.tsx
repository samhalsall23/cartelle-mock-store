import { AdminBlogsForm, AdminHeading } from "@/components/admin";
import { getAuthors, getBlogById } from "@/lib/server";

export default async function Page({ params }: { params: { id: string } }) {
  // === PARAMS ===
  const { id } = await params;

  // === QUERIES ===
  const blogs = await getBlogById(id);
  const authors = await getAuthors();
  const authorList = authors.success ? authors.data : [];

  if (!blogs.success || !blogs.data) {
    return <p>Blog not found.</p>;
  }

  return (
    <div>
      <AdminHeading heading="Edit Blog" />
      <AdminBlogsForm
        isEditMode={true}
        blogData={blogs.data}
        authorList={authorList}
      />
    </div>
  );
}
