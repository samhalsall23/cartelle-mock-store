import {
  SectionHeading,
  BaseSection,
  AnimateFadeIn,
  AnimateStagger,
  HeroSection,
  ProductTile,
  Button,
  FeatureCard,
  CollectionTile,
  ReviewCardsSection,
  HomeVideoSection,
} from "@/components";
import { HomeVideoSectionWrapper } from "@/components/base/HomeVideoSection/HomeVideoSectionClient";
import { mockReviews } from "@/components/base/ReviewCardsSection/data";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <BaseSection className="py-16 xl:py-20" id="hero-image">
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

      <div className="border-y border-neutral-03">
        <BaseSection
          id="feature-cards"
          className="relative py-16 xl:py-20 overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-16 xl:h-20 bg-white z-10"></div>
          <AnimateStagger
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 md:gap-20 xl:gap-6 animate-y-mobile md:animate-y-tablet xl:animate-y-desktop"
            staggerDelay={0.2}
            duration="long"
          >
            <FeatureCard
              number="01"
              title="Deliver with Quality"
              description="Each product is crafted with attention to detail and quality materials, ensuring durability and comfort."
            />
            <FeatureCard
              number="02"
              title="Designed to Impress"
              description="Our products feature sleek designs and modern aesthetics, making them a stylish addition to any wardrobe."
            />
            <FeatureCard
              number="03"
              title="Curated for You"
              description="We carefully select each item to meet high standards of style, comfort, and functionality."
            />
          </AnimateStagger>
        </BaseSection>
      </div>

      <BaseSection className="py-16 xl:py-20" id="collections-section">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SectionHeading
            heading="Collections"
            subheading="Curated for quality"
          />
          <CollectionTile
            title="Summer Essentials"
            description="Lightweight and breathable."
            imageUrl="/assets/clothes-model.jpg"
            href="/collections/summer-essentials"
          />
          <CollectionTile
            title="Winter Warmth"
            description="Cozy knits and comfort."
            imageUrl="/assets/hero-3.jpg"
            href="/collections/winter-collection"
          />
          <CollectionTile
            title="Professional Edge"
            description="Sophisticated workplace styles."
            imageUrl="/assets/clothes-model-hover.jpg"
            href="/collections/professional"
          />
          <CollectionTile
            title="Weekend Casual"
            description="Effortless everyday comfort."
            imageUrl="/assets/cartelle-hero-image.jpg"
            href="/collections/casual-wear"
          />
          <CollectionTile
            title="Premium Denim"
            description="Finest quality craftsmanship."
            imageUrl="/assets/hero-3.jpg"
            href="/collections/premium-denim"
          />
        </div>
      </BaseSection>

      <div className="bg-main-01">
        <ReviewCardsSection reviews={mockReviews} />
      </div>

      <HomeVideoSectionWrapper>
        <HomeVideoSection />
      </HomeVideoSectionWrapper>
    </main>
  );
}
