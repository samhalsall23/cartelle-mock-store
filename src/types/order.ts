import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
} from "@prisma/client";

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

type AdminOrderCartItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  title: string;
  image: string;
  size: {
    label: string;
  };
};

export type GetAdminOrder = {
  id: string;
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
  delieveryName: string | null;
  deliveryEmail: string | null;
  deliveryPhone: string | null;
  deliveryStreetAddress: string | null;
  deliveryCity: string | null;
  deliveryPostcode: string | null;
  deliveryState: string | null;
  deliveryCountry: string | null;
  billingName: string | null;
  billingStreetAddress: string | null;
  billingCity: string | null;
  billingPostcode: string | null;
  billingState: string | null;
  billingCountry: string | null;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  cart: {
    items: AdminOrderCartItem[];
  };
};

export type OrderDashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  averageOrderValue: number;
};
