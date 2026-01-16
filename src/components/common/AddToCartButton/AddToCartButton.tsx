"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartDialog } from "@/providers";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  price: string;
  imageUrl: string;
  size?: string;
  category?: string;
  className?: string;
};

export function AddToCartButton(props: AddToCartButtonProps) {
  // === PROPS ===
  const { productId, productName, price, imageUrl, size, category, className } =
    props;

  // === CONTEXT ===
  const { showDialog } = useCartDialog();

  // === STATE ===
  const [isLoading, setIsLoading] = useState(false);

  // === FUNCTIONS ===
  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      // TODO: Replace with your actual server action
      // const result = await addToCartAction({ productId, quantity: 1 });
      console.log("Adding to cart:", { productId, quantity: 1 });

      // Simulate server action for now
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show success dialog
      showDialog({
        productName,
        price,
        imageUrl,
        size,
        category,
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // TODO: Show error toast/notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      text={"Add to Cart"}
      variant={"dark"}
      onClick={handleAddToCart}
      isLoading={isLoading}
      className={className}
    />
  );
}
