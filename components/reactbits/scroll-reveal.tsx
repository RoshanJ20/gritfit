"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const word: Variants = {
  hidden: { opacity: 0.12, y: "0.2em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Reveals a line of copy word-by-word as it scrolls into view: each word lifts
 * from a dim ghost to full opacity. Restyled from ReactBits' ScrollReveal for
 * the big statement paragraphs. Reduced motion is handled by the global CSS
 * reduce block (durations collapse, so words appear immediately).
 */
export function ScrollReveal({
  children,
  className,
  stagger = 0.045,
}: {
  children: string;
  className?: string;
  stagger?: number;
}) {
  const words = children.split(" ");
  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      aria-label={children}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
