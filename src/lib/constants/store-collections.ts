import { ProductCategoryEnum } from "@prisma/client";

const CATEGORY_METADATA: Record<
  ProductCategoryEnum,
  { name: string; tagline: string; imageUrl: string }
> = {
  [ProductCategoryEnum.DRESSES]: {
    name: "Dresses",
    tagline: "Timeless elegance in every silhouette.",
    imageUrl: "/assets/store-collection-dresses.jpg",
  },
  [ProductCategoryEnum.OUTERWEAR]: {
    name: "Outerwear",
    tagline: "Impeccable craftsmanship meets modern protection.",
    imageUrl: "/assets/store-collection-outerwear.jpg",
  },
  [ProductCategoryEnum.TOPS_BOTTOMS]: {
    name: "Tops & Bottoms",
    tagline: "Essential pieces, elevated design.",
    imageUrl: "/assets/store-collection-tops-bottoms.jpg",
  },
  [ProductCategoryEnum.BAGS_ACCESSORIES]: {
    name: "Bags & Accessories",
    tagline: "The finishing touch to refined style.",
    imageUrl: "/assets/store-collection-bags-accessories.jpg",
  },
  [ProductCategoryEnum.SHOES]: {
    name: "Shoes",
    tagline: "Artisanal footwear for the discerning.",
    imageUrl: "/assets/store-collection-shoes.jpg",
  },
};

export const STORE_COLLECTIONS = Object.entries(CATEGORY_METADATA).map(
  ([category, metadata]) => ({
    id: category,
    name: metadata.name,
    tagline: metadata.tagline,
    imageUrl: metadata.imageUrl,
    slug: category.toLowerCase().replace("_", "-"),
  }),
);
