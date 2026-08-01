"use client";

import { motion, type Variants } from "motion/react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MembershipTier, BillingDuration } from "@/content/membership";
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
            <Pill>Classes</Pill>
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
            <Pill on>Classes</Pill>
            <span className="text-xs text-muted-foreground">+</span>
            <Pill on>Strength Club</Pill>
            {access.recovery && (
              <>
                <span className="text-xs text-muted-foreground">+</span>
                <Pill on>Essential Recovery</Pill>
              </>
            )}
          </>
        )}
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
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * A single membership tier. Keeps the finalized card styling and the row's
 * hover-recede behavior exactly; adds the animated access ladder, a cursor
 * spotlight on the highlighted tier, and staggered features whose emphasised
 * row pulses once as it appears.
 */
export function PlanCard({
  tier,
  duration,
}: {
  tier: MembershipTier;
  duration: BillingDuration;
}) {
  const price = tier.prices?.[duration];
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
          <motion.p
            key={duration}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex items-baseline gap-2 text-xl font-light text-foreground"
          >
            {price ? (
              <>
                <span className="text-3xl font-semibold">{price}</span>
                <span className="text-sm text-muted-foreground">
                  / {duration} months
                </span>
              </>
            ) : (
              <Placeholder label="Price">
                {duration}-month pricing at the club
              </Placeholder>
            )}
          </motion.p>
        </div>

        <AccessLadder access={tier.access} />

        {/* Feature list grows to fill the card so the footnote (and every
            card's bottom edge) lines up across the row. */}
        <div className="flex flex-1 flex-col">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            What’s included
          </p>
          <motion.ul
            className="mt-4 flex flex-col gap-3.5"
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
                          transition: {
                            duration: 1.1,
                            delay: 0.5,
                            times: [0, 0.5, 1],
                          },
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
                  <span
                    className={cn(
                      "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[3px] text-brand",
                      emphasised ? "bg-brand/25" : "bg-brand/[0.12]",
                    )}
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="flex-1">{feature}</span>
                </motion.li>
              );
            })}
          </motion.ul>

          {tier.excluded && tier.excluded.length > 0 && (
            <ul
              aria-label="Not included in this plan"
              className="mt-5 flex flex-col gap-2.5 border-t border-border/60 pt-5"
            >
              {tier.excluded.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground/45"
                >
                  <span
                    className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-foreground/[0.06]"
                    aria-hidden
                  >
                    <Minus className="size-3" strokeWidth={3} />
                  </span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {tier.footnote && (
            <p className="mt-auto pt-6 text-[0.7rem] leading-relaxed text-muted-foreground/60">
              {tier.footnote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
