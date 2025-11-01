import { cn } from "@/lib/utils";

type LinkType = {
  href: string;
  text: string;
  variant?: "default" | "on-dark" | "on-dark-secondary";
};

export function Link(props: LinkType) {
  // --- PROPS ---
  const { href, text, variant = "default" } = props;

  // --- CLASSES ---
  const linkClass = cn(
    "relative inline-block transition-colors duration-200",
    "before:absolute before:bottom-[-2px] before:left-0 before:h-[1px] before:w-0 before:bg-current before:transition-all before:duration-300 before:ease-in-out",
    "hover:before:w-full",
    "after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-200 after:ease-in-out after:delay-300",
    "hover:after:w-full hover:after:h-[1.5px]",
    variant === "default" && "text-navbar",
  );

  return (
    <a href={href} className={linkClass}>
      {text}
    </a>
  );
}
