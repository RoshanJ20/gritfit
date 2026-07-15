"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";
import type { SessionPack } from "@/content/recovery-sessions";
import { Placeholder } from "@/components/placeholder";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

const dot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 380, damping: 22 },
  },
};

/**
 * The session count made explicit: a large numeral + unit, reinforced by a row
 * of filled dots (one per session) that pop in on scroll. Replaces the earlier
 * dash meter so the quantity is unmistakable at a glance.
 */
function SessionCount({ sessions }: { sessions: number }) {
  return (
    <div>
      <p className="flex items-baseline gap-2">
        <span className="display text-5xl leading-none text-foreground">
          {sessions}
        </span>
        <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
          {sessions === 1 ? "session" : "sessions"}
        </span>
      </p>
      <motion.div
        className="mt-3.5 flex flex-wrap gap-1.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: 0.05 }}
      >
        {Array.from({ length: sessions }).map((_, i) => (
          <motion.span
            key={i}
            variants={dot}
            className="size-2.5 rounded-full bg-brand"
          />
        ))}
      </motion.div>
    </div>
  );
}

const featureList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const featureRow: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * A single recovery session pack. Shares the membership PlanCard visual
 * language — bordered grid seams, hover scale/recede, highlighted pack gets the
 * brand top-border, tint, "Best Value" badge, and cursor spotlight.
 */
export function SessionPackCard({ pack }: { pack: SessionPack }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden transition-all duration-300 ease-out",
        "border border-border -ml-px first:ml-0",
        "md:group-hover:[&:not(:hover)]:scale-[0.98] md:group-hover:[&:not(:hover)]:opacity-40",
        "md:hover:z-10 md:hover:scale-[1.04]",
        pack.highlight
          ? "border-t-2 border-t-brand bg-brand/[0.05]"
          : "bg-ink-900",
      )}
    >
      {pack.highlight && <SpotlightOverlay />}

      <div className="relative z-10 flex h-full flex-col gap-6 p-8 lg:p-10">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">{pack.name}</p>
            {pack.highlight && (
              <span className="inline-flex items-center bg-brand px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-background">
                Best Value
              </span>
            )}
          </div>
        </div>

        <SessionCount sessions={pack.sessions} />

        <p className="flex items-baseline text-xl font-light text-foreground">
          {pack.price ? (
            <span className="text-3xl font-semibold">{pack.price}</span>
          ) : (
            <Placeholder label="Price">Pricing at the club</Placeholder>
          )}
        </p>

        <motion.ul
          className="flex flex-col gap-3.5"
          variants={featureList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {pack.features.map((feature) => (
            <motion.li
              key={feature}
              variants={featureRow}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden />
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
