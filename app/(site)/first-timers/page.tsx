import type { Metadata } from "next";

import { firstTimers } from "@/content/first-timers";
import { PageHero } from "@/components/sections/page-hero";
import { SectionAccordion } from "@/components/sections/section-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "First Timers — Your first step starts here",
  description:
    "Everyone starts somewhere. Whether you’re stepping into RUSH, training in the Strength Club or entering Essential Recovery for the first time, your journey at Grit Fit starts the same way. Show up. We’ll take it from there.",
};

export default function FirstTimersPage() {
  return (
    <>
      <PageHero
        eyebrow={firstTimers.eyebrow}
        title={firstTimers.heading}
        lead={firstTimers.lead}
        mediaLabel="First Timers"
        mediaSrc="/images/first-timers.jpg"
      />

      {/* Your first visit (single-open accordion) */}
      <section className="border-t border-border">
        <div className="container-grit section">
          <Reveal>
            <p className="eyebrow">{firstTimers.visit.eyebrow}</p>
            <h2 className="display mt-4 max-w-[20ch] text-display-2">
              {firstTimers.visit.heading}
            </h2>
          </Reveal>
          <div className="mt-12">
            <SectionAccordion sections={firstTimers.visit.sections} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready when you are"
        heading="Book your intro session."
        body="Every first-timer begins with a complimentary Performance Assessment. No pressure. No expectations. Just a clear starting line."
      />
    </>
  );
}
