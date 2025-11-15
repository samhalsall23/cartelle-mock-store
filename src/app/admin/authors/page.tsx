import Link from "next/link";

import { prisma } from "@/lib/prisma";
import {
  AdminHeading,
  AdminDataTable,
  buttonVariants,
} from "@/components/admin";
import { cn } from "@/lib";

export default async function Page() {
  const authors = await prisma.author.findMany();
  console.log(authors);
  return (
    <div>
      <div className="flex justify-between">
        <AdminHeading heading="View Authors" />
        <Link
          href="/example"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
          )}
        >
          Go to Example
        </Link>
      </div>
      <AdminDataTable
        data={authors}
        columns={[
          { accessorKey: "id", header: "ID" },
          { accessorKey: "name", header: "Name" },
          { accessorKey: "occupation", header: "Occupation" },
        ]}
      />
    </div>
  );
}
