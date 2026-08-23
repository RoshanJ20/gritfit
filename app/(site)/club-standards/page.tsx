import type { Metadata } from "next";

import { clubStandards } from "@/content/club-standards";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

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

      {/* The nine sections run from 15 items down to 3, so an equal-height grid
          left large gaps under the short ones. CSS columns let each card size to
          its own content and the shorter ones pack in beneath the longer. */}
      <section className="border-t border-border">
        <div className="container-grit section">
          <div className="lg:columns-2 lg:gap-8">
            {clubStandards.sections.map((section, s) => (
              <Reveal
                key={section.title}
                delay={(s % 2) * 0.06}
                className="mb-6 break-inside-avoid lg:mb-8"
              >
                <div className="relative isolate overflow-hidden border border-border bg-ink-900 p-8 lg:p-10">
                  <SpotlightOverlay className="-z-10" />
                  <div className="flex items-baseline gap-4">
                    <span className="display text-sm text-brand">
                      {String(s + 1).padStart(2, "0")}
                    </span>
                    <h2 className="eyebrow">{section.title}</h2>
                  </div>
                  <ul className="mt-6 flex flex-col">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 border-b border-border py-4 text-muted-foreground last:border-b-0 last:pb-0"
                      >
                        <span
                          className="mt-2.5 size-1.5 shrink-0 bg-brand"
                          aria-hidden
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-center leading-relaxed text-muted-foreground">
              {clubStandards.closing}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
