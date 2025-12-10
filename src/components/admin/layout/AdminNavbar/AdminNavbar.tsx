"use client";

import { usePathname } from "next/navigation";

import { adminRoutes } from "@/lib";
import { AdminNavbarItem } from "./AdminNavbarItem";

export function AdminNavbar() {
  const pathName = usePathname();

  const isActive = (href: string) => pathName === href;

  return (
    <nav className="sticky top-0 left-0 w-full bg-white z-50 h-16 flex items-center px-5 md:px-10 xl:px-12">
      {/* Left Branding */}
      <div className="absolute left-5 md:left-10 xl:left-12 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <span className="font-semibold text-xl text-black">Cartelle</span>
        <span className="text-sm font-medium text-neutral-10 px-2 py-1 rounded bg-neutral-02">
          Admin
        </span>
      </div>

      {/* Center Nav Items */}
      <div className="flex-1 flex justify-center">
        <div className="h-11 flex items-center gap-2 rounded-full border border-neutral-02 bg-white/80 backdrop-blur-md shadow-sm">
          <AdminNavbarItem
            isActive={isActive(adminRoutes.home)}
            href={adminRoutes.home}
            text="Home"
          />
          <AdminNavbarItem
            isActive={isActive(adminRoutes.products)}
            href={adminRoutes.products}
            text="Products"
          />
          <AdminNavbarItem
            isActive={isActive(adminRoutes.orders)}
            href={adminRoutes.orders}
            text="Orders"
          />
          <AdminNavbarItem
            isActive={isActive(adminRoutes.blogs)}
            href={adminRoutes.blogs}
            text="Blog"
          />
          <AdminNavbarItem
            isActive={isActive(adminRoutes.authors)}
            href={adminRoutes.authors}
            text="Authors"
          />
        </div>
      </div>
    </nav>
  );
}
