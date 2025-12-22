import { AnimatedHeadingText, BaseSection } from "@/components";

export default function AboutPage() {
  return (
    <main>
      <BaseSection id="about-section">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            text="We're Here to Help"
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">
            {
              "Questions? Concerns? Let’s make your shopping experience seamless and enjoyable."
            }
          </p>
        </div>
      </BaseSection>
    </main>
  );
}
