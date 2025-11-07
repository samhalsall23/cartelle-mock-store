import * as React from "react";
import { cn } from "@/lib/utils/utils";

type ButtonProps = React.ComponentProps<"button"> & {
  text: string;
  variant?: "dark" | "light" | "dark-alternative" | "light-no-border";
  isBtn?: boolean;
};

export function getButtonStyles(
  variant: ButtonProps["variant"] = "dark",
  className?: string,
) {
  return cn(
    // Layout & Positioning
    "px-6 py-3 inline-flex items-center justify-center whitespace-nowrap",
    // Appearance
    "rounded-4xl font-medium text-base",
    // Transitions & Animations
    "transition-all",
    // Disabled States
    "disabled:pointer-events-none disabled:opacity-50",
    // Focus & Accessibility
    "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
    // Variant Classes
    variant === "dark" && "bg-neutral-11 text-white hover:text-white/80",
    variant === "light" && "bg-white text-black button-light-gradient-border",
    variant === "light-no-border" && "bg-white text-black",
    variant === "dark-alternative" &&
      "bg-black text-white button-dark-gradient-border",

    className,
  );
}

export function Button(props: ButtonProps) {
  // --- PROPS ---
  const {
    text,
    variant = "dark",
    className,
    isBtn = true,
    ...buttonProps
  } = props;

  // --- CLASSES ---
  const buttonClass = getButtonStyles(variant, className);

  return isBtn ? (
    <button className={buttonClass} {...buttonProps}>
      {text}
    </button>
  ) : (
    <div className={buttonClass}>{text}</div>
  );
}
