"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * "Heat. Cold. Repeat." — the contrast-therapy signature. The two extremes
 * enter from opposite directions (Heat rises up from below, Cold settles down
 * from above) and meet on the baseline, with "Repeat." resolving last. The
 * contrast is carried entirely by motion, so the palette stays pure lime/black.
 * Reduced motion collapses the travel and the words simply appear.
 */
const word: Variants = {
  hidden: (dir: number) => ({ opacity: 0, y: dir * 26 }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ContrastHeading({ className }: { className?: string }) {
  return (
    <motion.p
      className={cn("display flex flex-wrap gap-x-3", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ staggerChildren: 0.16 }}
      aria-label="Heat. Cold. Repeat."
    >
      <motion.span variants={word} custom={1} aria-hidden>
        Heat.
      </motion.span>
      <motion.span variants={word} custom={-1} aria-hidden>
        Cold.
      </motion.span>
      <motion.span variants={word} custom={1} className="text-brand" aria-hidden>
        Repeat.
      </motion.span>
    </motion.p>
  );
}
