"use client";

import { useId, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MembershipTier } from "@/content/membership";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

/** How a single pillar reads in the meter. */
type BarState = "included" | "optional" | "excluded";

/**
 * One access bar. `included` fills solid; `optional` fills with a dashed brand
 * pattern (a "pick one" option, not a guarantee); `excluded` stays an empty
 * grey track. The fill springs in from the left as the card scrolls into view;
 * `index` staggers the three bars so they fill in sequence.
 */
function AccessBar({ state, index }: { state: BarState; index: number }) {
  return (
    <span className="relative block h-2.5 flex-1 overflow-hidden rounded-full bg-border">
      {state !== "excluded" && (
        <motion.span
          className={cn(
            "block h-full origin-left rounded-full",
            state === "included" && "bg-brand",
          )}
          style={
            state === "optional"
              ? {
                  backgroundImage:
                    "repeating-linear-gradient(90deg, var(--brand) 0 7px, transparent 7px 12px)",
                }
              : undefined
          }
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 18,
            delay: index * 0.12,
          }}
        />
      )}
    </span>
  );
}

/**
 * Access meter: three bars, one per pillar — Strength Club, RUSH, Essential
 * Recovery — that spring-fill from the left as the card scrolls into view (the
 * page's signature moment). Each bar reads three ways:
 *   - solid brand fill  → included in this tier
 *   - dashed brand fill → optional, part of a "pick one" pair (Core)
 *   - empty grey        → not in this tier
 * On the choose-one tier the first two bars are dashed and bridged by an "OR"
 * badge, so "access to EITHER one" is unmistakable on its own — no second row.
 */
function AccessLadder({ access }: { access: MembershipTier["access"] }) {
  const chooseOne = access.pillars === "choose-one";
  const pillars: { label: string; state: BarState }[] = [
    { label: "Strength Club", state: chooseOne ? "optional" : "included" },
    { label: "RUSH", state: chooseOne ? "optional" : "included" },
    {
      label: "Essential Recovery",
      state: access.recovery ? "included" : "excluded",
    },
  ];

  return (
    <div className="flex flex-1 flex-col justify-center rounded-md border border-border/70 bg-background/40 p-6 lg:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Your access
      </p>

      <div className="mt-6">
        {/* Bars row — the "OR" badge straddles the dashed pair on Core. */}
        <div className="relative flex items-center gap-2">
          {pillars.map((pillar, i) => (
            <AccessBar key={pillar.label} state={pillar.state} index={i} />
          ))}
          {chooseOne && (
            <span className="absolute left-1/3 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/60 bg-ink-900 px-2 py-0.5 text-[0.7rem] font-bold uppercase leading-none tracking-[0.1em] text-brand">
              or
            </span>
          )}
        </div>

        {/* Labels row, aligned under their bars. */}
        <div className="mt-4 flex gap-2">
          {pillars.map((pillar) => (
            <span
              key={pillar.label}
              className={cn(
                "flex-1 text-[0.8rem] font-semibold uppercase leading-tight tracking-[0.12em]",
                pillar.state === "excluded"
                  ? "text-muted-foreground/50"
                  : "text-foreground",
              )}
            >
              {pillar.label}
            </span>
          ))}
        </div>
      </div>

      {chooseOne && (
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-brand">
          Choose either one
        </p>
      )}
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
export function PlanCard({ tier }: { tier: MembershipTier }) {
  const [flipped, setFlipped] = useState(false);
  // The 3D context is only switched on while the card is actually turning or
  // showing its back. See the comment on the wrapper below for why.
  const [turning, setTurning] = useState(false);
  const threeD = flipped || turning;
  const backId = useId();

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
     *  1. the 3D context only exists while the card is turning or flipped — an
     *     idle card is plain 2D, and the browser re-rasterises its type at the
     *     final scale once the transition settles, so it stays sharp;
     *  2. the hover scale is therefore gated on `!threeD`. A card that is mid-
     *     turn or already flipped falls back to the lift and shadow alone,
     *     which is what keeps its type crisp while the 3D texture is live.
     * The back face stays mounted (merely `invisible`) throughout so the card
     * keeps the height of its taller side and the row never jumps.
     */
    <div
      className={cn(
        // Tailwind v4 emits standalone `translate:` and `scale:` properties
        // rather than a composed `transform:`, so those are the names the
        // transition has to list or the lift and zoom snap instead of easing.
        "relative h-full transition-[translate,scale,box-shadow,opacity] duration-300 ease-out",
        "-ml-px first:ml-0",
        threeD && "[perspective:1800px]",
        // Every card that is not the hovered one recedes.
        "md:group-hover:[&:not(:hover)]:opacity-25",
        // The hovered card lifts clear of the row and grows. See the note above
        // for why the scale is gated on there being no 3D context.
        "md:hover:z-10 md:hover:-translate-y-1.5",
        !threeD && "md:hover:scale-[1.04]",
        "md:hover:shadow-[0_36px_90px_-40px_rgba(0,0,0,0.95)]",
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
              <p className="mt-4 text-base text-muted-foreground lg:text-lg">
                {tier.tagline}
              </p>
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
