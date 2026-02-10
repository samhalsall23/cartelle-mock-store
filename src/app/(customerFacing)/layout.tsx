import React from "react";

import { Footer, Navbar } from "@/components";
import { CartCountProvider, CartDialogProvider } from "@/providers";
import { getCartItemCount } from "@/lib/server/actions";
import { AddToCartDialog } from "@/components/common/AddToCartDialog/AddToCartDialog";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartCountProvider fetchCartItemCount={getCartItemCount}>
      <CartDialogProvider>
        <Navbar />
        {children}
        <Footer />
        <AddToCartDialog />
      </CartDialogProvider>
    </CartCountProvider>
  );
}
