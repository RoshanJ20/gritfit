import type { Metadata } from "next";

import { massage, recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { SiblingNav } from "@/components/sections/sibling-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { Callout } from "@/components/sections/callout";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Massage — Essential Recovery",
  description:
    "Recover with intention. Our appointment-based massage room is designed to support muscle recovery, reduce tension, and help you move and feel better between training sessions.",
};

const siblings = recovery.offerings
  .filter((o) => o.key !== "massage")
  .map(({ name, href, tagline }) => ({ name, href, tagline }));

export default function MassagePage() {
  return (
    <>
      <PageHero
        eyebrow="Essential Recovery · Massage"
        title="Massage"
        lead={[massage.intro]}
        mediaLabel="Massage"
      />

      <section className="container-grit py-24 lg:py-36">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div className="space-y-6">
            <Reveal>
              <p className="eyebrow">{massage.tagline}</p>
            </Reveal>
            {massage.paras.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-balance text-xl font-light leading-[1.6] text-foreground sm:text-2xl">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          <Callout label="Appointment-based">
            <span className="flex flex-wrap items-center gap-2 text-base font-normal">
              Booking details
              <Placeholder label="Booking">Coming soon</Placeholder>
            </span>
          </Callout>
        </div>
      </section>

      <SiblingNav eyebrow="More recovery" items={siblings} />
      <CtaBand
        eyebrow="The Recovery Zone"
        heading="Recover with intention."
        body="Recovery is training. Our team will guide you through the process between your sessions."
      />
    </>
  );
}
