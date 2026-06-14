import type { Metadata } from "next";

import { membershipTiers } from "@/content/membership";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "Membership — Choose how you train",
  description:
    "Three ways to train at Grit Fit: Open Gym, Platinum, and VIP. Every membership begins with a complimentary first class and a required assessment.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Choose how you train"
        mediaLabel="Membership"
      />

      {/* Tiers */}
      <section className="container-grit py-24 lg:py-36">
        <Reveal>
          <p className="eyebrow">Plans</p>
          <h2 className="display mt-4 text-display-2 max-w-[18ch]">
            Three ways in. One standard.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {membershipTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-6 bg-ink-900 p-8 lg:p-10">
                <div>
                  <p className="eyebrow">{tier.name}</p>
                  <p className="mt-4 text-xl font-light text-foreground">
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
          <Callout label="Please note">
            All memberships must be purchased at the club.
          </Callout>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
