import type { Metadata } from "next";

import { recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { SiblingNav } from "@/components/sections/sibling-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contrast Therapy — Essential Recovery",
  description:
    "Move between infrared heat and cold immersion—two extremes, one purpose. Designed to support physical recovery, improve circulation responses and build mental resilience.",
};

const siblings = recovery.experiences.filter(
  (e) => e.href !== "/recovery/contrast",
);

export default function ContrastTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="Essential Recovery · Contrast Therapy"
        title="Contrast Therapy"
        lead={[recovery.contrast.lines[1]]}
        mediaLabel="Contrast Therapy"
        mediaSrc="/images/recovery/contrast.jpg"
        mediaImagePosition="center 40%"
      />

      <section className="container-grit section">
        <div className="mx-auto max-w-4xl space-y-6">
          <Reveal>
            <p className="eyebrow">{recovery.contrast.eyebrow}</p>
          </Reveal>
          {recovery.contrast.lines.slice(1).map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-balance text-xl font-light leading-[1.6] text-foreground sm:text-2xl">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="display pt-6 text-balance text-display-2 text-foreground">
              {recovery.contrast.question}
            </p>
          </Reveal>
        </div>
      </section>

      <SiblingNav eyebrow="More recovery" items={siblings} />
      <CtaBand
        eyebrow="Essential Recovery"
        heading="Recovery is training."
        body="Arrive 10 minutes early. Our team will guide you through the process and recommended exposure times."
      />
    </>
  );
}
