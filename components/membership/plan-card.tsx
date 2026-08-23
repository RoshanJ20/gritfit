"use client";

import { useId, useState } from "react";
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
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.18 } },
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
 * A single membership tier, as a two-sided card.
 *
 * The front carries the decision-making summary — tier, pricing and the
 * animated access ladder — and closes on "See what's included". Clicking it
 * flips the card to the full inclusions list. Both faces sit in the same grid
 * cell so the card is always as tall as the taller side and nothing jumps when
 * it turns.
 */
export function PlanCard({
  tier,
  duration,
}: {
  tier: MembershipTier;
  duration: BillingDuration;
}) {
  const [flipped, setFlipped] = useState(false);
  // The 3D context is only switched on while the card is actually turning or
  // showing its back. See the comment on the wrapper below for why.
  const [turning, setTurning] = useState(false);
  const threeD = flipped || turning;
  const backId = useId();
  const price = tier.prices?.[duration];

  const flip = (next: boolean) => {
    setTurning(true);
    setFlipped(next);
  };

  const faceClass = cn(
    "[grid-area:1/1] relative flex flex-col overflow-hidden border border-border",
    "transition-colors duration-300",
    // Only meaningful inside a 3D context, and promoting a layer for it while
    // the card sits still is what softens the type.
    threeD && "[backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
    tier.highlight ? "border-t-2 border-t-brand bg-brand/[0.05]" : "bg-ink-900",
  );

  return (
    /*
     * Text crispness note: a `perspective` + `transform-style: preserve-3d`
     * subtree is rasterised to a GPU texture at its untransformed size. Any
     * scale on an ancestor then RESAMPLES that texture instead of re-rendering
     * the type, which is what made the hovered card look soft. So:
     *  1. the hover emphasis is a whole-pixel lift, border and shadow — never a
     *     scale, on this card or on its receding siblings;
     *  2. the 3D context itself only exists while the card is turning or
     *     flipped, so an idle card is plain 2D and its text is rendered at
     *     native resolution.
     * The back face stays mounted (merely `invisible`) throughout so the card
     * keeps the height of its taller side and the row never jumps.
     */
    <div
      className={cn(
        "relative h-full transition-[transform,box-shadow] duration-300 ease-out",
        "-ml-px first:ml-0",
        threeD && "[perspective:1800px]",
        "md:group-hover:[&:not(:hover)]:opacity-40",
        "md:hover:z-10 md:hover:-translate-y-1",
        "md:hover:shadow-[0_28px_70px_-40px_rgba(0,0,0,0.95)]",
      )}
    >
      <motion.div
        className={cn("grid h-full", threeD && "[transform-style:preserve-3d]")}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setTurning(false)}
      >
        {/* ---------------- FRONT ---------------- */}
        <div
          className={faceClass}
          aria-hidden={flipped}
          inert={flipped}
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
              <p className="mt-3 text-sm text-muted-foreground">
                {tier.tagline}
              </p>
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

            {/* mt-auto floors the trigger so every card's button lines up. */}
            <button
              type="button"
              onClick={() => flip(true)}
              aria-expanded={flipped}
              aria-controls={backId}
              className="group/flip mt-auto inline-flex items-center justify-between gap-3 border border-border px-4 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:border-brand/60 hover:bg-brand/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              See what&rsquo;s included
              <span
                aria-hidden
                className="text-brand transition-transform duration-300 group-hover/flip:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {/* ---------------- BACK ---------------- */}
        <div
          id={backId}
          className={cn(
            faceClass,
            "[transform:rotateY(180deg)]",
            // Held in the layout (so the card keeps its height) but taken out
            // of the paint entirely whenever there is no 3D context to hide it.
            !threeD && "invisible",
          )}
          aria-hidden={!flipped}
          inert={!flipped}
        >
          <div className="relative z-10 flex h-full flex-col gap-5 p-8 lg:p-10">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">{tier.name}</p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                What&rsquo;s included
              </p>
            </div>

            <motion.ul
              className="flex flex-col gap-3.5"
              variants={featureList}
              initial="hidden"
              animate={flipped ? "show" : "hidden"}
            >
              {tier.features.map((feature) => {
                const emphasised = feature === tier.highlightFeature;
                return (
                  <motion.li
                    key={feature}
                    variants={featureRow}
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
                className="flex flex-col gap-2.5 border-t border-border/60 pt-5"
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
              <p className="text-[0.7rem] leading-relaxed text-muted-foreground/60">
                {tier.footnote}
              </p>
            )}

            <button
              type="button"
              onClick={() => flip(false)}
              className="group/flip mt-auto inline-flex items-center justify-between gap-3 border border-border px-4 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:border-brand/60 hover:bg-brand/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              <span
                aria-hidden
                className="text-brand transition-transform duration-300 group-hover/flip:-translate-x-1"
              >
                ←
              </span>
              Back to {tier.name}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
