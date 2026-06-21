import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import {
  membershipTiers,
  membershipNote,
  type MembershipTier,
} from "@/content/membership";
import { CtaBand } from "@/components/sections/cta-band";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "Membership — Choose your commitment",
  description:
    "Three ways to train at Grit Fit: Open Gym, Platinum, and VIP. Every membership begins with a complimentary first class and a required assessment.",
};

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
 * Cumulative access "ladder": three rungs unlock as you move up the tiers
 * (one training pillar → both pillars → + Recovery Zone). The summary line
 * spells out RUSH/Strength Club access so the choose-one vs both distinction
 * is unmistakable.
 */
function AccessLadder({ access }: { access: MembershipTier["access"] }) {
  const labels = ["One pillar", "Both pillars", "+ Recovery"];
  return (
    <div className="rounded-md border border-border/70 bg-background/40 p-4">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Your access
      </p>

      {/* Three-rung meter */}
      <div className="mt-3 flex items-end gap-1.5">
        {labels.map((label, r) => {
          const unlocked = r < access.filled;
          return (
            <div key={label} className="flex-1">
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-colors",
                  unlocked ? "bg-brand" : "bg-border",
                )}
                aria-hidden
              />
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
      </div>

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

export default function MembershipPage() {
  return (
    <>
      {/* Compact header — no media, so the plans sit in the first viewport */}
      <section className="bg-spotlight border-b border-border pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="container-grit">
          <Reveal playOnMount>
            <p className="eyebrow">Membership</p>
          </Reveal>
          <Reveal playOnMount delay={0.08}>
            <h1 className="display mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] pb-[0.08em]">
              Choose your <span className="font-light italic">commitment.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Plans */}
      <section className="container-grit py-12 lg:py-16">
        <div className="group relative grid md:grid-cols-3">
          {membershipTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden transition-all duration-300 ease-out",
                  // Borders live on each card (not on a shared grid backing) so
                  // that when a card scales, its border travels with it. The old
                  // hairline-grid backing stayed put during scale and exposed a
                  // gray outline around the receded cards — this avoids that.
                  "border border-border -ml-px first:ml-0",
                  // When a card in the row is hovered, only the OTHER cards
                  // (:not(:hover)) recede — dim + shrink. The hovered card is
                  // excluded from this and simply lifts, staying fully crisp.
                  "md:group-hover:[&:not(:hover)]:scale-[0.98] md:group-hover:[&:not(:hover)]:opacity-40",
                  "md:hover:z-10 md:hover:scale-[1.04]",
                  tier.highlight
                    ? "border-t-2 border-t-brand bg-brand/[0.05]"
                    : "bg-ink-900",
                )}
              >
                <div className="flex h-full flex-col gap-6 p-8 lg:p-10">
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
                  <p className="mt-5 text-xl font-light text-foreground">
                    <Placeholder label="Price">Pricing at the club</Placeholder>
                  </p>
                </div>

                <AccessLadder access={tier.access} />

                <ul className="flex flex-col gap-3.5">
                  {tier.features.map((feature) => {
                    const emphasised = feature === tier.highlightFeature;
                    return (
                      <li
                        key={feature}
                        className={cn(
                          "flex gap-3 text-sm leading-relaxed",
                          emphasised
                            ? "-mx-2 rounded-sm border-l-2 border-brand bg-brand/[0.08] px-3 py-2 font-medium text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <span
                          className="mt-2 size-1.5 shrink-0 bg-brand"
                          aria-hidden
                        />
                        {feature}
                      </li>
                    );
                  })}
                </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Callout label="Please note">{membershipNote}</Callout>
        </div>
      </section>

      <CtaBand className="py-16 lg:py-20" />
    </>
  );
}
