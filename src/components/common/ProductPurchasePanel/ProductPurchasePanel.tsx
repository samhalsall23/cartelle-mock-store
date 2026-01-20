"use client";

import { useState } from "react";

import { useCartDialog } from "@/providers";
import { ProductWithSizes } from "@/types";
import { ProductPurchasePanelUI } from "./ProductPurchasePanelUI";
import { screamingSnakeToTitle } from "@/lib";

type ProductPurchasePanelProps = {
  product: Omit<ProductWithSizes, "price"> & { price: string };
  defaultSize?: string;
};

export function ProductPurchasePanel(props: ProductPurchasePanelProps) {
  // === PROPS ===
  const { product, defaultSize } = props;

  // === STATE ===
  const [isLoading, setIsLoading] = useState(false);

  // === CONTEXT ===
  const { showDialog } = useCartDialog();

  // === FUNCTIONS ===
  const handleAddToCart = async (sizeId: string, sizeLabel: string) => {
    setIsLoading(true);

    try {
      //   await addToCartAction({
      //     productId: product.id,
      //     sizeId,
      //     quantity: 1,
      //   });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      showDialog({
        productName: product.name,
        price: product.price,
        imageUrl: product.images[0],
        size: sizeLabel,
        category: screamingSnakeToTitle(product.category),
        quantity: 1,
      });
    } catch {
      // Handle error (e.g., show notification)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductPurchasePanelUI
      isLoading={isLoading}
      product={product}
      onAddToCart={handleAddToCart}
      defaultSize={defaultSize}
    />
  );
}
