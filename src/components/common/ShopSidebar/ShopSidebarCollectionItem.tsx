import Link from "next/link";

import { routes } from "@/lib";
import { linkClasses } from "./ShopSidebar";

type ShopSidebarCollectionItemProps = {
  href: string;
  label: string;
};

export function ShopSidebarCollectionItem(
  props: ShopSidebarCollectionItemProps,
) {
  // === PROPS ===
  const { href, label } = props;

  return (
    <Link href={`${routes.shop}${href}`} className={linkClasses}>
      <span className="text-neutral-04 pr-2">•</span>
      <span>{label}</span>
    </Link>
  );
}
