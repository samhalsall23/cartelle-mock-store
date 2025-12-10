import { AdminHeading, AdminTableBlogs } from "@/components/admin";
import { getBlogs } from "@/lib/server/blogs";

export default async function Page() {
  // === FETCH DATA ===
  const blogs = await getBlogs();

  if (!blogs.success) {
    return <div>Error loading blogs: {blogs.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Blogs" />

      <AdminTableBlogs authors={blogs.data} />
    </div>
  );
}
