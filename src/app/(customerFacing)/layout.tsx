import React from "react";

import { AddToCartDialog, Footer, Navbar } from "@/components";
import { CartCountProvider, CartDialogProvider } from "@/providers";
import { getCartItemCount } from "@/lib/server";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartItemCount = await getCartItemCount();
  const count = cartItemCount.success ? cartItemCount.data.quantity : 0;

  return (
    <CartCountProvider initialCount={count}>
      <CartDialogProvider>
        <Navbar />
        {children}
        <Footer />
        <AddToCartDialog />
      </CartDialogProvider>
    </CartCountProvider>
  );
}
