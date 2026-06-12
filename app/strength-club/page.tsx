import type { Metadata } from "next";

import { strength } from "@/content/strength";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Strength Club — A coached training floor",
  description:
    "The Strength Club is not an open gym. Structured programming through workout cards, with coaches available on the floor to guide, support, and help you progress.",
};

export default function StrengthClubPage() {
  return (
    <>
      <PageHero
        eyebrow={strength.eyebrow}
        title={strength.heading}
        lead={strength.intro}
        mediaLabel="Strength Club"
        mediaKind="video"
      />

      {/* How it works */}
      <section className="container-grit py-24 lg:py-36">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-4 text-display-2 max-w-[18ch]">
            You’ll always know what to do when you walk in.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {strength.howItWorks.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 bg-ink-900 p-8 lg:p-10">
                <span className="display text-3xl text-brand">{s.step}</span>
                <h3 className="display text-2xl">{s.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-3 text-center">
          {strength.closer.map((line, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="display text-2xl text-foreground sm:text-3xl">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="container-grit grid gap-12 py-24 lg:grid-cols-[0.6fr_1fr] lg:gap-20 lg:py-32">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-display-2">Strength Club, explained.</h2>
          </Reveal>
          <FaqAccordion faqs={strength.faqs} />
        </div>
      </section>

      <CtaBand
        eyebrow="Train with intent"
        heading="Respect the space. Earn the progress."
        body="Every member begins with an assessment. From there, structured programming and coaches on the floor — so you always know what to do."
      />
    </>
  );
}
