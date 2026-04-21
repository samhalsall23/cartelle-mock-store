"use client";

import { useEffect } from "react";
import { useCartCount } from "@/providers";
import { clearCart } from "@/lib/server/actions";
import { CheckoutSuccessUI } from "./CheckoutSuccessUI";

type CheckoutSuccessProps = {
  orderNumber?: string;
  email?: string;
};

export function CheckoutSuccess(props: CheckoutSuccessProps) {
  const { orderNumber, email } = props;

  // === CONTEXT ===
  const { setItemCount } = useCartCount();

  // EFFECTS
  useEffect(() => {
    async function syncCartAfterSuccess() {
      await clearCart();
      setItemCount(0);
    }

    void syncCartAfterSuccess();
  }, [setItemCount]);

  return <CheckoutSuccessUI orderNumber={orderNumber} email={email} />;
}
