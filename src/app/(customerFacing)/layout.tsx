import React from "react";

import { AddToCartDialog, Footer, Navbar } from "@/components";
import { CartDialogProvider } from "@/providers";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartDialogProvider>
      <Navbar />
      {children}
      <Footer />
      <AddToCartDialog />
    </CartDialogProvider>
  );
}
