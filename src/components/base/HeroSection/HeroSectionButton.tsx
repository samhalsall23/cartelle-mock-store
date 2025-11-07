"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

import { ArrowUpRightIcon, getButtonStyles } from "@/components";
import { cn } from "@/lib";

type HeroButtonSectionProps = {
  className?: string;
  onClick?: () => void;
};

export function HeroSectionButton({
  className,
  onClick,
}: HeroButtonSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [circleWidth, setCircleWidth] = useState(0);

  const buttonRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setButtonWidth(node.offsetWidth);
  }, []);

  const circleRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setCircleWidth(node.offsetWidth);
  }, []);

  return (
    <button
      className={cn(className, "flex gap-1 relative cursor-pointer")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label="Shop now - Navigate to products"
      type="button"
    >
      <motion.div
        ref={buttonRef}
        className="z-20"
        animate={{
          x: isHovered ? circleWidth + 4 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={getButtonStyles("light-no-border")}>Shop now</div>
      </motion.div>

      <motion.div
        ref={circleRef}
        className="bg-white text-black flex items-center justify-center rounded-full w-12 h-12 min-w-12 min-h-12 shrink-0 z-10"
        animate={{
          x: isHovered ? -(buttonWidth + 4) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ArrowUpRightIcon />
      </motion.div>
    </button>
  );
}
