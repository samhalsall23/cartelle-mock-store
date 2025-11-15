import Image from "next/image";

import { BaseSection } from "@/components/layout";
import { AnimateFadeIn } from "@/components/ui";
import { cn } from "@/lib";
import { HeroSectionButton } from "./HeroSectionButton";

export function HeroSection() {
  return (
    <BaseSection
      id="hero-image"
      className="min-h-[calc(100vh-74px)] md:min-h-[calc(100vh-82px)] flex flex-col pb-5 md:pb-12"
    >
      <div className="h-[75dvh] w-full relative mt-auto">
        <Image
          src="/assets/hero-3.jpg"
          alt="Hero Image"
          fill
          quality={80}
          priority
          className="object-cover rounded-sm"
        />
        <AnimateFadeIn disableIsInView={true} duration="long">
          <div
            className={cn(
              "absolute inset-0 rounded-sm",
              "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0.6)_100%)]",
              "sm:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0.6)_100%)]",
              "xl:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_100%)]",
            )}
          />
        </AnimateFadeIn>
        <AnimateFadeIn disableIsInView={true} duration="long">
          <div className="absolute inset-0 flex flex-col xl:flex-row justify-end items-center xl:items-end px-6 py-10 md:p-10 xl:p-12 text-white">
            <HeroSectionButton className="order-2 xl:order-1 mt-6 xl:mt-0" />
            <div className="flex flex-col xl:text-end gap-4 xl:ms-auto order-1 xl:order-2">
              <h1 className={cn("text-[clamp(2.5rem,8vw,5rem)]!")}>
                Effortlessly Selling
              </h1>
              <h5 className="text-white md:text-neutral-04">
                Discover quality products with fast shipping and secure
                checkout.
              </h5>
            </div>
          </div>
        </AnimateFadeIn>
      </div>
    </BaseSection>
  );
}
