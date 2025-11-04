import { cn } from "@/lib/utils/utils";
import Link from "next/link";

type LinkType = {
  href: string;
  text: string;
  variant?: "default" | "on-dark" | "on-dark-secondary";
  onMouseEnter?: () => void;
};

export function CustomLink(props: LinkType) {
  // --- PROPS ---
  const { href, text, variant = "default", onMouseEnter = () => {} } = props;

  // --- CLASSES ---
  const linkClass = cn(
    "relative inline-block transition-colors duration-200 w-fit",
    "before:absolute before:bottom-[-2px] before:left-0 before:h-[1px] before:w-0 before:bg-current",
    "hover:before:w-full hover:before:transition-all hover:before:duration-300 hover:before:ease-in-out",
    variant === "default" && "text-navbar",
  );

  return (
    <Link onMouseEnter={onMouseEnter} href={href} className={linkClass}>
      {text}
    </Link>
  );
}
