import Image from "next/image";

import {
  AnimatedHeadingText,
  AnimateFadeIn,
  BaseSection,
  FeatureCard,
} from "@/components";

const aboutImageSrcArray = [
  "/assets/hero-3.jpg",
  "/assets/clothes-model.jpg",
  "/assets/hero-3.jpg",
  "/assets/clothes-model.jpg",
];

const featureCardsData = [
  {
    number: "01",
    title: "Premium Quality",
    description:
      "We source only the finest materials to ensure every piece meets our high standards of excellence.",
  },
  {
    number: "02",
    title: "Sustainable Fashion",
    description:
      "Committed to eco-friendly practices and ethical production methods that protect our planet.",
  },
  {
    number: "03",
    title: "Expert Craftsmanship",
    description:
      "Each item is carefully crafted by skilled artisans with decades of combined experience.",
  },
  {
    number: "04",
    title: "Customer First",
    description:
      "Your satisfaction is our priority with dedicated support and hassle-free returns.",
  },
];

export default function SupportPage() {
  return (
    <main>
      <BaseSection
        id="about-section-heading"
        className="flex flex-col pb-5 md:pb-10 xl:pb-20 gap-8 xl:gap-16"
      >
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            text="About Us"
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">
            {
              "Get to know who we are, what we stand for, and why we love what we do."
            }
          </p>
        </div>
        <div className="w-full z-10 relative overflow-hidden">
          <div className="flex gap-4 animate-scroll-left-slow">
            {/* First set of images */}
            {aboutImageSrcArray.map((src, index) => (
              <div
                className="relative w-62.5 aspect-3/4 lg:w-87.5 lg:aspect-6/7 shrink-0"
                key={`first-${index}`}
              >
                <Image
                  className="object-cover rounded-sm"
                  src={src}
                  alt={`About us image ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 350px, 250px"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {aboutImageSrcArray.map((src, index) => (
              <div
                className="relative w-62.5 aspect-3/4 lg:w-87.5 lg:aspect-6/7 shrink-0"
                key={`second-${index}`}
              >
                <Image
                  className="object-cover rounded-sm"
                  src={src}
                  alt={`About us image ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 350px, 250px"
                />
              </div>
            ))}
          </div>
        </div>
      </BaseSection>

      <BaseSection id="base-section-facts" className="py-16 xl:py-20">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] md:gap-12 xl:items-start">
          <div className="relative aspect-video xl:aspect-auto xl:h-full">
            <Image
              className="object-cover rounded-sm"
              src="/assets/clothes-model-hover.jpg"
              alt={"About us image facts"}
              fill
              sizes="(min-width: 1280px) 33vw, 100vw"
            />
          </div>
          <div className="grid xl:col-span-1 grid-cols-1 md:grid-cols-2 xl:grid-rows-2 xl:auto-rows-min gap-y-10 gap-x-6 md:border-y py-10">
            {featureCardsData.map((card) => (
              <AnimateFadeIn key={card.number}>
                <FeatureCard
                  number={card.number}
                  title={card.title}
                  description={card.description}
                />
              </AnimateFadeIn>
            ))}
          </div>
        </div>
      </BaseSection>
    </main>
  );
}
