import { Prisma } from "@prisma/client";

// === PRODUCT MUTATION INPUT ===
export type ProductMutationInput = { id: string };

// === PRODUCT WITH ORDER ITEM COUNTS ===
export type ProductGetAllCounts = Omit<
  Prisma.ProductGetPayload<{
    include: {
      cartItems: {
        include: {
          cart: {
            include: {
              order: {
                select: {
                  status: true;
                };
              };
            };
          };
        };
      };
    };
  }>,
  "cartItems" | "price"
> & {
  totalSold: number;
  price: number;
};

// PRODUCT WITH SIZES
export type ProductWithSizes = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
  };
}>;
