// === ENUMS ===
export const PRODUCT_CATEGORY_VALUES = [
  "DRESSES",
  "OUTERWEAR",
  "TOPS_BOTTOMS",
  "BAGS_ACCESSORIES",
  "SHOES",
] as const;

export type ProductCategoryEnum = (typeof PRODUCT_CATEGORY_VALUES)[number];

export const SIZE_TYPE_VALUES = ["Standard", "ShoeSize", "OneSize"] as const;
export type SizeTypeEnum = (typeof SIZE_TYPE_VALUES)[number];

// === PRODUCT WITH ORDER ITEM COUNTS ===
export type ProductGetAllCounts = {
  id: string;
  name: string;
  description: string;
  price: number; // Converted from Decimal
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  slug: string;
  category: string;
  sizeType: string | null;
  totalSold: number;
};

// === PRODUCT WITH SIZES ===
export type ProductWithSizes = {
  id: string;
  name: string;
  description: string;
  price: number; // Converted from Decimal
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  slug: string;
  category: string;
  sizeType: string | null;
  sizes: Array<{
    id: string;
    label: string;
    productId: string;
    stockTotal: number;
    stockReserved: number;
  }>;
};

// === DASHBOARD STATS ===
export type ProductDashboardStats = {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
};
