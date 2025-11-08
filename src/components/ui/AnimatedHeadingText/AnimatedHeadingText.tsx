"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";

import { SCROLL_ANIMATION_IN_VIEW_CONFIG } from "@/components/lib";

type AnimatedHeadingTextProps = {
  text: string;
  variant?: "home-screen" | "page-title";
  className?: string;
};

export function AnimatedHeadingText({
  text,
  variant = "page-title",
  className = "",
}: AnimatedHeadingTextProps) {
  // === REF ===
  const ref = useRef<HTMLHeadingElement | null>(null);

  // === HOOKS ===
  const isInView = useInView(ref, SCROLL_ANIMATION_IN_VIEW_CONFIG);

  // === FUNCTIONS ===
  const letters = text.split("");

  const staggerValueMap: { [key: string]: number } = {
    "home-screen": 0.03,
    "page-title": 0.01,
  };

  // === FRAMER MOTION VARIANTS ===
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerValueMap[variant],
      },
    },
  };

  const letter: Variants = {
    hidden: {
      opacity: 0.001,
      filter: "blur(10px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <h3 className="sr-only">{text}</h3>
      <motion.h2
        ref={ref}
        className={className}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-hidden="true"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            style={{
              display: "inline-block",
              willChange: "transform, opacity, filter",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h2>
    </>
  );
}
