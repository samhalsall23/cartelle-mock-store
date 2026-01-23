import React from "react";

import { AddToCartDialog, Footer, Navbar } from "@/components";
import { CartCountProvider, CartDialogProvider } from "@/providers";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartCountProvider>
      <CartDialogProvider>
        <Navbar />
        {children}
        <Footer />
        <AddToCartDialog />
      </CartDialogProvider>
    </CartCountProvider>
  );
}
