import {
  AnimatedHeadingText,
  BaseSection,
  ProductTile,
  ShopSidebar,
} from "@/components";

import { STORE_COLLECTIONS } from "@/lib";

// === MOCK PRODUCTS GRID COMPONENT ===
function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      <ProductTile
        id={"1"}
        name={"Organic Cotton Oversized Tee"}
        price={89.99}
        primaryImageUrl={"/assets/clothes-model.jpg"}
        hoverImageUrl={"/assets/clothes-model-hover.jpg"}
      />
      <ProductTile
        id={"2"}
        name={"Premium Wool Blend Sweater"}
        price={159.99}
        primaryImageUrl={"/assets/clothes-model.jpg"}
        hoverImageUrl={"/assets/clothes-model-hover.jpg"}
      />
      <ProductTile
        id={"3"}
        name={"Vintage Denim Straight Leg Jeans"}
        price={129.99}
        primaryImageUrl={"/assets/clothes-model.jpg"}
        hoverImageUrl={"/assets/clothes-model-hover.jpg"}
      />
    </div>
  );
}

// === PAGE ===
export default async function ShopPage({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  // === PARAMS ===
  const { id } = await params;

  // === CONSTANTS ===
  const DEFAULT_TITLE = "Explore Our Shop";
  const DEFAULT_DESCRIPTION =
    "Discover handpicked products crafted with care and passion.";

  // === FUNCTIONS ===
  const getTitle = (): { title: string; description: string } => {
    // /shop/collections/[collection-id]
    if (id && id.length === 2) {
      const [, collectionId] = id;
      const storeCollection = STORE_COLLECTIONS.find(
        (collection) => collectionId === collection.id,
      );

      return {
        title: storeCollection?.name ?? DEFAULT_TITLE,
        description: storeCollection?.tagline ?? DEFAULT_DESCRIPTION,
      };
    }

    // /shop/new-arrivals or /shop/collections
    if (id && id.length === 1) {
      const [subpage] = id;

      if (subpage === "collections") {
        return {
          title: "Shop Collections",
          description:
            "Explore our curated collections, featuring seasonal and themed selections.",
        };
      }

      return {
        title: "New Arrivals",
        description: "Discover the latest additions to our collection.",
      };
    }

    // /shop (default)
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    };
  };

  const { title, description } = getTitle();

  return (
    <main>
      <BaseSection id="shop-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            text={title}
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">{description}</p>
        </div>
      </BaseSection>

      <BaseSection id="products-section" className="pb-16 xl:pb-20">
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">
          <ShopSidebar collections={STORE_COLLECTIONS} />
          <ProductsGrid />
        </div>
      </BaseSection>
    </main>
  );
}
