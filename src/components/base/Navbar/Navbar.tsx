import { SearchIcon } from "@/components/icons/SearchIcon";
import { useState } from "react";
import { CustomLink } from "../../ui/Link/CustomLink";
import { NavbarSubMenu } from "./NavbarSubMenu";

export function Navbar() {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <nav className="px-10 py-6 flex justify-between items-center">
      <h4>Cartelle</h4>
      <div className="flex gap-3 items-center">
        <CustomLink href="/" text="Home" />
        <div
          className="relative inline-block"
          onMouseLeave={() => setShowSubMenu(false)}
        >
          <CustomLink
            onMouseEnter={() => setShowSubMenu(true)}
            href="/shop"
            text="Shop"
          />
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 pt-3"
            onMouseLeave={() => setShowSubMenu(false)}
          >
            <NavbarSubMenu
              show={showSubMenu}
              categories={["All", "New Arrivals"]}
              collections={[
                "Skincare Products",
                "Furniture",
                "Technology",
                "Clothing",
              ]}
            />
          </div>
        </div>
        <CustomLink href="/about" text="About" />
        <CustomLink href="/support" text="Support" />
        <CustomLink href="/blog" text="Blog" />
      </div>
      <button aria-label="Search" className="text-neutral-12 p-2 cursor-pointer">
        <SearchIcon />
      </button>
    </nav>
  );
}
