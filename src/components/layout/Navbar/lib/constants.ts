import { routes } from "@/lib/routing/routes";
import { NavItemType } from "../types";

// Main navigation structure
export const navItems: NavItemType[] = [
  {
    id: "home",
    text: "Home",
    href: routes.home,
  },
  {
    id: "shop",
    text: "Shop",
    href: routes.shop,
    subItems: [
      {
        id: "shop-categories",
        text: "Shop",
        items: [
          {
            id: "shop-category-all",
            text: "Shop",
            href: routes.shop,
          },
          {
            id: "shop-category-new",
            text: "New Arrivals",
            href: routes.shop,
          },
        ],
      },
      {
        id: "shop-collections",
        text: "Collections",
        items: [
          {
            id: "shop-collection-skincare",
            text: "Skincare Products",
            href: routes.shop,
          },
          {
            id: "shop-collection-furniture",
            text: "Furniture",
            href: routes.shop,
          },
          {
            id: "shop-collection-technology",
            text: "Technology",
            href: routes.shop,
          },
          {
            id: "shop-collection-clothing",
            text: "Clothing",
            href: routes.shop,
          },
        ],
      },
    ],
  },
  {
    id: "about",
    text: "About",
    href: routes.about,
  },
  {
    id: "support",
    text: "Support",
    href: routes.support,
  },
  {
    id: "blog",
    text: "Blog",
    href: routes.blog,
  },
] as const;
