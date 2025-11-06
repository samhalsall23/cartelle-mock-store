import { BaseSection } from "@/components";
import Image from "next/image";

export function HeroSection() {
  return (
    <BaseSection
      id="hero-image"
      className="min-h-[calc(100vh-140px)] flex flex-col"
    >
      <div className="h-[75vh] w-full relative mt-auto">
        <Image
          src="/assets/cartelle-hero-image.jpg"
          alt="Hero Image"
          fill
          className="object-cover rounded-sm"
        />
      </div>
    </BaseSection>
  );
}
