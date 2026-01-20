"use client";

import { useState } from "react";

import { useCartDialog } from "@/providers";
import { ProductWithSizes } from "@/types";
import { ProductPurchasePanelUI } from "./ProductPurchasePanelUI";
import { screamingSnakeToTitle } from "@/lib";
import { addToCart } from "@/lib/server";

type ProductPurchasePanelProps = {
  product: Omit<ProductWithSizes, "price"> & { price: string };
  defaultSize?: string;
};

export function ProductPurchasePanel(props: ProductPurchasePanelProps) {
  // === PROPS ===
  const { product, defaultSize } = props;

  // === STATE ===
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // === CONTEXT ===
  const { showDialog } = useCartDialog();

  // === FUNCTIONS ===
  const handleAddToCart = async (sizeId: string, sizeLabel: string) => {
    setIsLoading(true);

    try {
      const result = await addToCart({
        productId: product.id,
        sizeId,
        quantity: 1,
      });

      if (!result.success) {
        setIsError(true);
        return;
      }

      showDialog({
        productName: product.name,
        price: product.price,
        imageUrl: product.images[0],
        size: sizeLabel,
        category: screamingSnakeToTitle(product.category),
        quantity: result.data.quantity,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductPurchasePanelUI
      isLoading={isLoading}
      isError={isError}
      product={product}
      onAddToCart={handleAddToCart}
      defaultSize={defaultSize}
    />
  );
}
