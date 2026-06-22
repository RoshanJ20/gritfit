"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const list: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const row: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export type AnimatedListItem = {
  content: React.ReactNode;
  /** Muted bullet/marker style (for "what we don't do" lists). */
  muted?: boolean;
};

/**
 * Staggered list that slides each row in from the left as it enters view.
 * Restyled from ReactBits' AnimatedList to match the site's bullet rows: a
 * brand square marker, hairline divider, generous line-height. Reduced motion
 * collapses the durations via the global CSS block, so rows appear in place.
 */
export function AnimatedList({
  items,
  className,
  stagger = 0.06,
  muted = false,
}: {
  items: (React.ReactNode | AnimatedListItem)[];
  className?: string;
  stagger?: number;
  muted?: boolean;
}) {
  return (
    <motion.ul
      className={cn("flex flex-col", className)}
      variants={list}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {items.map((item, i) => {
        const normalized: AnimatedListItem =
          item && typeof item === "object" && "content" in item
            ? (item as AnimatedListItem)
            : { content: item as React.ReactNode };
        const isMuted = normalized.muted ?? muted;
        return (
          <motion.li
            key={i}
            variants={row}
            className={cn(
              "flex items-start gap-4 border-b border-border py-3.5 leading-relaxed last:border-b-0",
              isMuted ? "text-muted-foreground" : "text-foreground",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-2 shrink-0",
                isMuted
                  ? "h-px w-3 bg-muted-foreground/60"
                  : "size-1.5 bg-brand",
              )}
            />
            <span>{normalized.content}</span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
