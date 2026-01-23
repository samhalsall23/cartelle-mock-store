import { AdminHeading, AdminBlogsTable } from "@/components/admin";
import { getBlogs } from "@/lib/server";

export default async function Page() {
  // === QUERIES ===
  const blogs = await getBlogs();

  if (!blogs.success) {
    return <div>Error loading blogs: {blogs.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Blogs" />

      <AdminBlogsTable authors={blogs.data} />
    </div>
  );
}
