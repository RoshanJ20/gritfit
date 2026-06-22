"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";
import type { MembershipTier } from "@/content/membership";
import { Placeholder } from "@/components/placeholder";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

/** A small access pill — "on" = included (brand), otherwise a neutral choice. */
function Pill({
  children,
  on = false,
}: {
  children: React.ReactNode;
  on?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium",
        on
          ? "border-brand/60 bg-brand/10 text-foreground"
          : "border-border text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Cumulative access "ladder": three rungs that spring-fill from the left as the
 * card scrolls into view (the page's signature moment). The summary line spells
 * out RUSH/Strength Club access so the choose-one vs both distinction is
 * unmistakable.
 */
function AccessLadder({ access }: { access: MembershipTier["access"] }) {
  const labels = ["One pillar", "Both pillars", "+ Recovery"];
  return (
    <div className="rounded-md border border-border/70 bg-background/40 p-4">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Your access
      </p>

      {/* Three-rung meter */}
      <motion.div
        className="mt-3 flex items-end gap-1.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: 0.12 }}
      >
        {labels.map((label, r) => {
          const unlocked = r < access.filled;
          return (
            <div key={label} className="flex-1">
              <span className="block h-1.5 overflow-hidden rounded-full bg-border">
                {unlocked && (
                  <motion.span
                    className="block h-full origin-left rounded-full bg-brand"
                    variants={
                      {
                        hidden: { scaleX: 0 },
                        show: {
                          scaleX: 1,
                          transition: {
                            type: "spring",
                            stiffness: 140,
                            damping: 18,
                          },
                        },
                      } as Variants
                    }
                  />
                )}
              </span>
              <span
                className={cn(
                  "mt-2 block text-[0.6rem] uppercase tracking-[0.12em]",
                  unlocked ? "text-foreground" : "text-muted-foreground/50",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Plain-language breakdown */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {access.pillars === "choose-one" ? (
          <>
            <Pill>RUSH</Pill>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand">
              or
            </span>
            <Pill>Strength Club</Pill>
            <span className="ml-0.5 inline-flex items-center rounded-sm bg-brand px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-background">
              Choose 1
            </span>
          </>
        ) : (
          <>
            <Pill on>RUSH</Pill>
            <span className="text-xs text-muted-foreground">+</span>
            <Pill on>Strength Club</Pill>
            {access.recovery && (
              <>
                <span className="text-xs text-muted-foreground">+</span>
                <Pill on>Recovery Zone</Pill>
              </>
            )}
          </>
        )}
      </div>

      {!access.recovery && (
        <p className="mt-2.5 text-[0.7rem] text-muted-foreground/60">
          Recovery Zone not included
        </p>
      )}
    </div>
  );
}

const featureList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const featureRow: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * A single membership tier. Keeps the finalized card styling and the row's
 * hover-recede behavior exactly; adds the animated access ladder, a cursor
 * spotlight on the highlighted tier, and staggered features whose emphasised
 * row pulses once as it appears.
 */
export function PlanCard({ tier }: { tier: MembershipTier }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden transition-all duration-300 ease-out",
        "border border-border -ml-px first:ml-0",
        "md:group-hover:[&:not(:hover)]:scale-[0.98] md:group-hover:[&:not(:hover)]:opacity-40",
        "md:hover:z-10 md:hover:scale-[1.04]",
        tier.highlight
          ? "border-t-2 border-t-brand bg-brand/[0.05]"
          : "bg-ink-900",
      )}
    >
      {tier.highlight && <SpotlightOverlay />}

      <div className="relative z-10 flex h-full flex-col gap-6 p-8 lg:p-10">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">{tier.name}</p>
            {tier.highlight && (
              <span className="inline-flex items-center bg-brand px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-background">
                Most Chosen
              </span>
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{tier.tagline}</p>
          <p className="mt-5 text-xl font-light text-foreground">
            <Placeholder label="Price">Pricing at the club</Placeholder>
          </p>
        </div>

        <AccessLadder access={tier.access} />

        <motion.ul
          className="flex flex-col gap-3.5"
          variants={featureList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {tier.features.map((feature) => {
            const emphasised = feature === tier.highlightFeature;
            return (
              <motion.li
                key={feature}
                variants={featureRow}
                {...(emphasised
                  ? {
                      whileInView: {
                        boxShadow: [
                          "0 0 0 0 rgba(174,217,35,0)",
                          "0 0 0 3px rgba(174,217,35,0.22)",
                          "0 0 0 0 rgba(174,217,35,0)",
                        ],
                        transition: { duration: 1.1, delay: 0.5, times: [0, 0.5, 1] },
                      },
                      viewport: { once: true },
                    }
                  : {})}
                className={cn(
                  "flex gap-3 text-sm leading-relaxed",
                  emphasised
                    ? "-mx-2 rounded-sm border-l-2 border-brand bg-brand/[0.08] px-3 py-2 font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden />
                {feature}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
