import type { Metadata } from "next";
import Link from "next/link";

import { strength } from "@/content/strength";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Strength Club",
  description:
    "The Strength Club is not an open gym. A coached training floor built on structure, accountability, and progression.",
};

export default function AboutStrengthClubPage() {
  return (
    <>
      <PageHero
        eyebrow={strength.eyebrow}
        title="About Strength Club"
        lead={[strength.heading]}
        mediaLabel="Strength Club"
        mediaKind="video"
      />

      {/* Statement */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-4xl space-y-7">
          {strength.intro.map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-2xl font-light leading-[1.5] text-foreground sm:text-3xl">
                {line}
              </p>
            </Reveal>
          ))}
          <div className="space-y-1 pt-4">
            {strength.closer.map((line, i) => (
              <Reveal key={i} delay={0.2 + i * 0.06}>
                <p className="display text-display-2 text-foreground">{line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Link to offerings */}
      <section className="border-t border-border">
        <div className="container-grit py-16 lg:py-20">
          <Reveal>
            <Link
              href="/strength-club"
              className="group flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="display text-display-2 transition-colors group-hover:text-brand">
                See how it works
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors group-hover:text-brand">
                Strength Club offerings
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Train with intent"
        heading="Respect the space. Earn the progress."
      />
    </>
  );
}
