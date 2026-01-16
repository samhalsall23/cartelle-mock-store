"use client";

import { useCartDialog } from "@/providers";
import { AddToCartDialogUI } from "./AddToCartDialogUI";

export function AddToCartDialog() {
  const { dialogOpen, dialogProduct, hideDialog } = useCartDialog();

  if (!dialogProduct) return null;

  return (
    <AddToCartDialogUI
      open={dialogOpen}
      onOpenChange={hideDialog}
      productName={dialogProduct.productName}
      price={dialogProduct.price}
      imageUrl={dialogProduct.imageUrl}
      size={dialogProduct.size}
      productType={dialogProduct.productType}
      cartItemCount={dialogProduct.cartItemCount}
    />
  );
}
