import type { Metadata } from "next";

import { clubStandards } from "@/content/club-standards";
import { PageHero } from "@/components/sections/page-hero";
import { SectionAccordion } from "@/components/sections/section-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Club Standards",
  description:
    "The standards that keep the Grit Fit training floor, recovery zone and common areas focused, clean, safe and uncompromising on quality.",
};

export default function ClubStandardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Club Standards"
        title={clubStandards.title}
        lead={clubStandards.intro}
        mediaLabel="The Club"
        mediaSrc="/images/club-interior.jpg"
      />

      {/* Same shape as First Timers: every standards section is a single-open
          accordion item, so the nine lists stay scannable instead of stacking
          into one long page. */}
      <section className="border-t border-border">
        <div className="container-grit section">
          <Reveal>
            <p className="eyebrow">The Standard</p>
            <h2 className="display mt-4 max-w-[20ch] text-display-2">
              How we train, and how we treat the space.
            </h2>
          </Reveal>
          <div className="mt-12">
            <SectionAccordion
              sections={clubStandards.sections.map((section) => ({
                title: section.title,
                blocks: [{ items: section.items }],
              }))}
            />
          </div>

          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-balance text-center leading-relaxed text-muted-foreground">
              {clubStandards.closing}{" "}
              <a
                href={`mailto:${clubStandards.closingEmail}`}
                className="text-brand underline-offset-4 hover:underline"
              >
                {clubStandards.closingEmail}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
