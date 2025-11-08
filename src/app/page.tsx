import {
  SectionHeading,
  BaseSection,
  AnimateFadeIn,
  HeroSection,
  ProductTile,
  Button,
} from "@/components";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BaseSection className="py-16 xl:py-20 " id="hero-image">
        <div className="flex flex-col gap-8">
          <div className="flex items-end">
            <SectionHeading
              heading="New Arrivals"
              subheading="Fresh Selections"
            />
            <Button
              className="ms-auto h-fit hidden md:inline-block"
              variant="light"
              text={"View all products"}
            />
          </div>
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
          <Button
            className="w-full md:hidden"
            variant="light"
            text={"View all products"}
          />
        </div>
      </BaseSection>
    </main>
  );
}
