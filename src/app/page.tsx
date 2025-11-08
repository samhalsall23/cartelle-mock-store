import {
  SectionHeading,
  BaseSection,
  AnimateFadeIn,
  HeroSection,
  ProductTile,
} from "@/components";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BaseSection id="hero-image">
        <div className="py-16 xl:py-20 flex flex-col gap-8">
          <SectionHeading
            heading="New Arrivals"
            subheading="Fresh Selections"
          />
          <AnimateFadeIn className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductTile
              id={"1"}
              name={"Organic Cotton Oversized Tee"}
              price={89.99}
              primaryImageUrl={"/assets/clothes-model.jpg"}
              hoverImageUrl={"/assets/clothes-model-hover.jpg"}
              loading="eager"
            />
            <ProductTile
              id={"2"}
              name={"Premium Wool Blend Sweater"}
              price={159.99}
              primaryImageUrl={"/assets/clothes-model.jpg"}
              hoverImageUrl={"/assets/clothes-model-hover.jpg"}
              loading="eager"
            />
            <ProductTile
              id={"3"}
              name={"Vintage Denim Straight Leg Jeans"}
              price={129.99}
              primaryImageUrl={"/assets/clothes-model.jpg"}
              hoverImageUrl={"/assets/clothes-model-hover.jpg"}
              loading="eager"
            />
          </AnimateFadeIn>
        </div>
      </BaseSection>
    </main>
  );
}
