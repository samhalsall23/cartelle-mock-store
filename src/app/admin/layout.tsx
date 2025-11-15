import React from "react";

import { AdminNavbar } from "@/components/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      <main className="flex-1 px-5 md:px-10 xl:px-12 py-6 bg-white">
        {children}
      </main>
    </div>
  );
}
