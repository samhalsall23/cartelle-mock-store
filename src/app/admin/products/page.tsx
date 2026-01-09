import { AdminHeading, AdminBlogsTable } from "@/components/admin";
import { getBlogs } from "@/lib/server/blogs";

export default async function Page() {
  // === QUERIES ===
  const blogs = await getBlogs();

  if (!blogs.success) {
    return <div>Error loading products: {blogs.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Products" />

      <AdminBlogsTable authors={blogs.data} />
    </div>
  );
}
