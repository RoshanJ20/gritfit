import type { Metadata } from "next";

import { firstTimers } from "@/content/first-timers";
import { PageHero } from "@/components/sections/page-hero";
import { SectionAccordion } from "@/components/sections/section-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { ScrollReveal } from "@/components/reactbits/scroll-reveal";

export const metadata: Metadata = {
  title: "First Timers — Your first step starts here",
  description:
    "Everyone starts somewhere. Whether you’re stepping into a RUSH class, training on the Strength Club floor, or entering The Recovery Zone for the first time — your journey begins the same way: show up.",
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

      {/* Opening statement — stays open */}
      <section className="container-grit section">
        <div className="mx-auto max-w-3xl space-y-6">
          {firstTimers.intro.map((line, i) => (
            <p
              key={i}
              className="text-balance text-2xl font-light leading-[1.5] text-foreground sm:text-3xl"
            >
              <ScrollReveal>{line}</ScrollReveal>
            </p>
          ))}
        </div>
      </section>

      {/* Group 1 — your first visit (single-open accordion) */}
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

      {/* Group 2 — PT terms & expectations (single-open accordion) */}
      <section className="border-t border-border">
        <div className="container-grit section">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">{firstTimers.ptTerms.eyebrow}</p>
                <p className="mt-4 max-w-sm text-balance leading-relaxed text-muted-foreground">
                  {firstTimers.ptTerms.intro}
                </p>
              </div>
            </Reveal>
            <SectionAccordion sections={firstTimers.ptTerms.sections} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready when you are"
        heading="Book your intro session."
        body="Every first-timer begins with a complimentary assessment. No pressure. No expectations. Just a clear starting line."
      />
    </>
  );
}
