import type { Metadata } from "next";

import { clubStandards } from "@/content/club-standards";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

export const metadata: Metadata = {
  title: "Club Standards & Policies",
  description:
    "The standards and policies that keep the Grit Fit floor, locker rooms, and recovery zone running with respect and intent.",
};

export default function ClubStandardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Club Standards"
        title="Standards & Policies"
        mediaLabel="The Club"
        mediaSrc="/images/club-interior.jpg"
      />

      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            {clubStandards.sections.map((section, s) => (
              <Reveal key={section.title} delay={s * 0.06}>
                <div className="relative isolate flex h-full flex-col overflow-hidden bg-ink-900 p-8 lg:p-10">
                  <SpotlightOverlay className="-z-10" />
                  <p className="eyebrow">{section.title}</p>
                  <ul className="mt-6 flex flex-col">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 border-b border-border py-4 text-muted-foreground last:border-b-0"
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
        </div>
      </section>

      <CtaBand />
    </>
  );
}
