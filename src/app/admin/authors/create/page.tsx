import { AdminFormAuthors, AdminHeading } from "@/components/admin";

export default async function Page() {
  return (
    <div>
      <AdminHeading heading="Add Author" />
      <AdminFormAuthors />
    </div>
  );
}
