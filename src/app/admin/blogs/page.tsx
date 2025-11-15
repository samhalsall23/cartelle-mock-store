import { prisma } from "@/lib/prisma";
import { AdminHeading } from "@/components/admin";

export default async function Page() {
  const blogs = await prisma.blogPost.findMany();
  console.log(blogs);
  return <AdminHeading heading="View Blogs" />;
}
