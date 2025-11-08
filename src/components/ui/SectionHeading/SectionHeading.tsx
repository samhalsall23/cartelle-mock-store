import { AnimatedHeadingText } from "../AnimatedHeadingText";

export function SectionHeading() {
  return (
    <div className="flex flex-col gap-3">
      <AnimatedHeadingText
        text="New Arrivals"
        variant="home-screen"
        className="text-4xl! md:text-5xl! xl:text-6xl!"
      />
      <p className="text-neutral-10 uppercase text-md md:text-lg">
        Fresh Selections
      </p>
    </div>
  );
}
