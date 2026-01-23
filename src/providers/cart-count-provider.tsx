"use client";

import { getCartItemCount } from "@/lib/server";
import { createContext, useContext, useState, ReactNode } from "react";

type CartCountContextType = {
  itemCount: number;
  refreshCartCount: () => Promise<void>;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
};

const CartCountContext = createContext<CartCountContextType | undefined>(
  undefined,
);

export function CartCountProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0);

  const refreshCartCount = async () => {
    const result = await getCartItemCount();
    if (result.success) {
      setItemCount(result.data.quantity);
    }
  };

  return (
    <CartCountContext.Provider
      value={{ itemCount, refreshCartCount, setItemCount }}
    >
      {children}
    </CartCountContext.Provider>
  );
}

export function useCartCount() {
  const context = useContext(CartCountContext);
  if (!context) {
    throw new Error("useCartCount must be used within CartCountProvider");
  }
  return context;
}
