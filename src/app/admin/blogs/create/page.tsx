import { AdminBlogsForm, AdminHeading } from "@/components/admin";

export default async function Page() {
  return (
    <div>
      <AdminHeading heading="Add Blog" />
      <AdminBlogsForm />
    </div>
  );
}
