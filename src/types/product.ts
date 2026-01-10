import { Prisma } from "@prisma/client";

// === PRODUCT MUTATION INPUT ===
export type ProductMutationInput = { id: string };

// === PRODUCT WITH ORDER ITEM COUNTS ===
export type ProductGetAllCounts = Omit<
  Prisma.ProductGetPayload<{
    include: {
      orderItems: {
        include: {
          order: {
            select: {
              status: true;
            };
          };
        };
      };
    };
  }>,
  "orderItems" | "price"
> & {
  totalSold: number;
  price: number;
};

// === PRODUCT GET BY ID RESPONSE ===
export type ProductGetByIdResponse = Prisma.ProductGetPayload<object>;
