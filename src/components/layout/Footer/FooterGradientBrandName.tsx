import { cn } from "@/lib/utils/utils";

export function FooterGradientBrandName() {
  return (
    <span
      className={cn(
        "block w-full text-transparent footer-text-gradient leading-none",
        "text-[clamp(1.5rem,26vw,26rem)]",
        "sm:text-[clamp(1.5rem,28vw,20rem)]",
        "md:text-[clamp(1.5rem,26vw,20rem)]",
        "xl:text-[clamp(1.5rem,15vw,20rem)]",
      )}
    >
      Cartelle
    </span>
  );
}
