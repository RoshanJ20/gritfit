import type { Metadata } from "next";

import { membershipNote } from "@/content/membership";
import { CtaBand } from "@/components/sections/cta-band";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";
import { MembershipPlans } from "@/components/membership/membership-plans";

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
      <section className="container-grit section-sm">
        <MembershipPlans />

        <div className="mt-10">
          <Callout label="Please note">{membershipNote}</Callout>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
