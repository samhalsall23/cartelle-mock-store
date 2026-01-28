import Image from "next/image";
import { CartItemWithDetails } from "@/types";

type CheckoutCartItemProps = {
  item: CartItemWithDetails;
  arrivalDate: string;
};

export function CheckoutCartItem(props: CheckoutCartItemProps) {
  const { item, arrivalDate } = props;

  const itemTotal = (Number(item.unitPrice) * item.quantity).toFixed(2);

  return (
    <div className="flex gap-4 py-4 border-b border-neutral-04 last:border-b-0">
      {/* Product Image */}
      <div className="relative h-20 w-20 bg-neutral-3 rounded-md overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          quality={60}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <h4 className="text-sm font-medium text-neutral-12 truncate">
          {item.title}
        </h4>
        <p className="text-xs text-neutral-10">Size: {item.size.label}</p>
        <p className="text-xs text-neutral-10">Quantity: {item.quantity}</p>
        <p className="text-xs text-neutral-09">Arrives: {arrivalDate}</p>
      </div>

      {/* Price */}
      <div className="text-sm font-medium text-neutral-11 shrink-0">
        ${itemTotal}
      </div>
    </div>
  );
}
