import { Prisma } from "@prisma/client";

type OrderPayload = Prisma.OrderGetPayload<{
  include: { cart: { include: { items: true } } };
}>;

// TO DO: Clean up typing here to simpler types

export type OrderWithCart = Omit<OrderPayload, "totalPrice" | "cart"> & {
  totalPrice: number;
  cart: Omit<OrderPayload["cart"], "items"> & {
    items: Array<
      Omit<OrderPayload["cart"]["items"][number], "unitPrice"> & {
        unitPrice: number;
      }
    >;
  };
};
