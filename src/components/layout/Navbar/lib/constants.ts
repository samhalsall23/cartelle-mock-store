import { routes } from "@/lib/routing/routes";
import { NavItemType } from "../types";

export const HOME_NAVBAR_TEXT = "Home";
export const SHOP_NAVBAR_TEXT = "Shop";
export const ABOUT_NAVBAR_TEXT = "About";
export const SUPPORT_NAVBAR_TEXT = "Support";
export const BLOG_NAVBAR_TEXT = "Blog";

// Main navigation structure
export const navItems: NavItemType[] = [
  {
    id: "home",
    text: HOME_NAVBAR_TEXT,
    href: routes.home,
  },
  {
    id: "shop",
    text: SHOP_NAVBAR_TEXT,
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
    text: ABOUT_NAVBAR_TEXT,
    href: routes.about,
  },
  {
    id: "support",
    text: SUPPORT_NAVBAR_TEXT,
    href: routes.support,
  },
  {
    id: "blog",
    text: BLOG_NAVBAR_TEXT,
    href: routes.blog,
  },
] as const;
