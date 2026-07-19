"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";
import type { SessionPack } from "@/content/recovery-sessions";
import { Placeholder } from "@/components/placeholder";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

/**
 * The session count made explicit: a large numeral + unit above a proportional
 * meter. The brand fill spans `sessions / maxSessions`, so each pack reads at a
 * glance against the largest one; the unfilled track carries faint unit ticks
 * so the bar feels measured. Replaces the earlier row of dots.
 */
function SessionCount({
  sessions,
  maxSessions,
}: {
  sessions: number;
  maxSessions: number;
}) {
  const pct = Math.min(100, Math.max(0, (sessions / maxSessions) * 100));
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

      {/* Proportional meter — filled to sessions/maxSessions over a ticked track */}
      <div className="relative mt-4 h-[6px] w-full overflow-hidden rounded-full bg-foreground/[0.08]">
        {/* Faint unit ticks — one division per session across the full scale */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent calc(100% / ${maxSessions} - 1px), color-mix(in srgb, var(--foreground) 12%, transparent) calc(100% / ${maxSessions} - 1px), color-mix(in srgb, var(--foreground) 12%, transparent) calc(100% / ${maxSessions}))`,
          }}
        />
        {/* Brand fill — grows in on scroll */}
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-brand"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
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
export function SessionPackCard({
  pack,
  maxSessions,
}: {
  pack: SessionPack;
  maxSessions: number;
}) {
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

        <SessionCount sessions={pack.sessions} maxSessions={maxSessions} />

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
