import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { membershipTiers, membershipNote } from "@/content/membership";
import { CtaBand } from "@/components/sections/cta-band";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "Membership — Choose your commitment",
  description:
    "Three ways to train at Grit Fit: Open Gym, Platinum, and VIP. Every membership begins with a complimentary first class and a required assessment.",
};

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
      <section className="container-grit py-14 lg:py-20">
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {membershipTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col gap-6 p-8 lg:p-10",
                  tier.highlight
                    ? "border-t-2 border-brand bg-brand/[0.05]"
                    : "bg-ink-900",
                )}
              >
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

                <ul className="flex flex-col gap-3.5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 bg-brand"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <Callout label="Please note">{membershipNote}</Callout>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
