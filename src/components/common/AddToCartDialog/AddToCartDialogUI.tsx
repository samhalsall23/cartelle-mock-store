"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { CircleCheckIcon } from "@/components/icons";
import { getButtonStyles } from "@/components/ui/Button";

type AddToCartDialogUIProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  price: number;
  imageUrl: string;
  size?: string;
  productType?: string;
  cartItemCount?: number;
};

export function AddToCartDialogUI(props: AddToCartDialogUIProps) {
  // === PROPS ===
  const {
    open,
    onOpenChange,
    productName,
    price,
    imageUrl,
    size,
    productType,
    cartItemCount,
  } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 py-2">
            <CircleCheckIcon />
            <DialogTitle>Added to Cart</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* PRODUCT TILE */}
          <div className="flex gap-4">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-sm bg-neutral-02">
              <Image
                src={imageUrl}
                alt={productName}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <h4 className="text-base line-clamp-2">{productName}</h4>
              {productType && (
                <p className="text-sm text-neutral-10">{productType}</p>
              )}
              <div className="flex flex-col gap-0.5 text-sm text-neutral-10">
                {size && <p>Size {size}</p>}
              </div>
              <p className="mt-auto text-base text-neutral-10">
                ${price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-2.5">
            <Link
              href="/cart"
              className={getButtonStyles("light")}
              onClick={() => onOpenChange(false)}
            >
              View Cart{cartItemCount ? ` (${cartItemCount})` : ""}
            </Link>
            <Link
              href="/checkout"
              className={getButtonStyles("dark")}
              onClick={() => onOpenChange(false)}
            >
              Checkout
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
