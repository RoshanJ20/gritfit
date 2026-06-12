"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset to travel, in px. */
  y?: number;
  /** Seconds to wait before animating. */
  delay?: number;
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
  /** Play on mount instead of on scroll-into-view (for above-the-fold/hero). */
  playOnMount?: boolean;
  as?: "div" | "section" | "span" | "li";
};

/**
 * Generic reveal: fades + slides its children up. Triggers on scroll-into-view
 * by default; pass `playOnMount` for above-the-fold content that should animate
 * immediately. The workhorse wrapper used across every section.
 */
export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  once = true,
  playOnMount = false,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const trigger = playOnMount
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once, margin: "-10% 0px -10% 0px" },
      };
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const child: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Splits text into words (or characters) and staggers each into place. Use for
 * hero headlines and statement lines.
 */
export function SplitText({
  text,
  className,
  by = "word",
  stagger = 0.04,
  once = true,
  playOnMount = false,
}: {
  text: string;
  className?: string;
  by?: "word" | "char";
  stagger?: number;
  once?: boolean;
  playOnMount?: boolean;
}) {
  const tokens = by === "word" ? text.split(" ") : Array.from(text);
  const trigger = playOnMount
    ? { animate: "show" as const }
    : {
        whileInView: "show" as const,
        viewport: { once, margin: "-10% 0px" },
      };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      custom={stagger}
      initial="hidden"
      {...trigger}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span variants={child} className="inline-block">
            {token}
            {by === "word" && i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
