"use client";

import Link from "next/link";
import { useState } from "react";

import { cn, routes } from "@/lib";

import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { NavbarSubMenu } from "./NavbarSubMenu";
import { navItems } from "./lib";

import {
  CheckoutIcon,
  CheveronLeftIcon,
  MenuBarIcon,
  CloseIcon,
  CustomLink,
  SearchIcon,
} from "@/components";

export function Navbar() {
  // === State ===
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  return (
    <div className="sticky top-0 left-0 w-full z-40 bg-white">
      <nav className="mx-auto px-5 py-2 md:px-10 xl:px-12 md:py-3 flex justify-between items-center relative bg-white z-20">
        <>
          <button
            aria-label="Go Back"
            className={cn(
              showMobileMenu && activeSubMenu !== null
                ? "opacity-100"
                : "opacity-0 hidden pointer-events-none",
              "p-3 -m-3.5 transition-opacity duration-300 ease-in-out cursor-pointer",
              showMobileMenu ? "will-change-opacity" : "will-change-auto",
            )}
            onClick={() => setActiveSubMenu(null)}
          >
            <CheveronLeftIcon />
          </button>
          <Link className="p-3 -ms-3" href={routes.home}>
            <h4
              className={cn(
                showMobileMenu && "opacity-0",
                "transition-opacity duration-300 ease-in-out",
                showMobileMenu ? "will-change-opacity" : "will-change-auto",
              )}
            >
              Cartelle
            </h4>
          </Link>
        </>

        <div className="gap-3 items-center hidden md:flex">
          {navItems.map((item) => {
            if (item.subItems) {
              return (
                <div
                  key={item.id}
                  className="relative flex items-center"
                  onMouseLeave={() => setShowSubMenu(false)}
                >
                  <CustomLink
                    onMouseEnter={() => setShowSubMenu(true)}
                    href={item.href}
                    text={item.text}
                  />
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-3 ${showSubMenu ? "pointer-events-auto" : "pointer-events-none"}`}
                    onMouseLeave={() => setShowSubMenu(false)}
                  >
                    <NavbarSubMenu
                      show={showSubMenu}
                      subItems={item.subItems}
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <CustomLink key={item.id} href={item.href} text={item.text} />
              );
            }
          })}
        </div>

        <div className="flex items-center text-neutral-12">
          <button
            aria-label="Search"
            className={cn(
              "p-3 cursor-pointer transition-opacity duration-300 ease-in-out",
              showMobileMenu ? "opacity-0 pointer-events-none" : "opacity-100",
              showMobileMenu ? "will-change-opacity" : "will-change-auto",
            )}
          >
            <SearchIcon />
          </button>
          <button
            aria-label="Checkout"
            className={cn(
              "p-3 cursor-pointer transition-opacity duration-300 ease-in-out",
              showMobileMenu ? "opacity-0 pointer-events-none" : "opacity-100",
              showMobileMenu ? "will-change-opacity" : "will-change-auto",
            )}
          >
            <CheckoutIcon />
          </button>
          <button
            aria-label="Menu"
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setActiveSubMenu(null);
            }}
            className={cn("p-3 cursor-pointer relative", "md:hidden")}
          >
            <MenuBarIcon className={`${showMobileMenu ? "hidden" : "block"}`} />
            <CloseIcon className={`${showMobileMenu ? "block" : "hidden"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <NavbarMobileMenu
        activeSubMenu={activeSubMenu}
        setActiveSubMenu={setActiveSubMenu}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
    </div>
  );
}
