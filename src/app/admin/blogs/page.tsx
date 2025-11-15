import { prisma } from "@/lib/prisma";
import { AdminHeading, AdminDataTable } from "@/components/admin";

export default async function Page() {
  const blogs = await prisma.blogPost.findMany();
  console.log(blogs);
  return (
    <div>
      <AdminHeading heading="View Blogs" />

      <AdminDataTable data={blogs} columns={[]} />
    </div>
  );
}
