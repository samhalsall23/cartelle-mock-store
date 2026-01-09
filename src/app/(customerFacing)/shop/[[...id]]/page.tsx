import {
  AnimatedHeadingText,
  BaseSection,
  ProductTile,
  ShopSidebar,
} from "@/components";

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
  params: { id: string[] };
}) {
  //   const getShop;

  return (
    <main>
      <BaseSection id="shop-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            text="Explore Our Shop"
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">
            {"Discover handpicked products crafted with care and passion."}
          </p>
        </div>
      </BaseSection>

      <BaseSection id="products-section" className="pb-16 xl:pb-20">
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-12">
          <ShopSidebar
            collections={[
              {
                label: "Summer",
                href: "/shop",
              },
              {
                label: "Summer",
                href: "/shop",
              },
              {
                label: "Summer",
                href: "/shop",
              },
              {
                label: "Summer",
                href: "/shop",
              },
            ]}
          />
          <ProductsGrid />
        </div>
      </BaseSection>
    </main>
  );
}
