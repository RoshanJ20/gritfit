import type { Metadata } from "next";
import Link from "next/link";

import { strength } from "@/content/strength";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export const metadata: Metadata = {
  title: "Strength Club — A coached training floor",
  description:
    "The Strength Club is not an open gym. Structured programming through workout cards, with coaches available on the floor to guide, support, and help you progress.",
};

const { about } = strength;

export default function StrengthClubPage() {
  return (
    <>
      <PageHero
        eyebrow={strength.eyebrow}
        title={strength.heading}
        lead={[about.lead]}
        mediaLabel="Strength Club"
        mediaKind="video"
      />

      {/* Concise about — The Floor statement + creed */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-4xl space-y-7">
          {about.statement.map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-2xl font-light leading-[1.5] text-foreground sm:text-3xl">
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="display pt-6 text-balance text-display-2 text-foreground">
              {about.creed}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Offerings — how it works */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-36">
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
                  <p className="leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
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
        </div>
      </section>

      {/* Remaining about — what you get / what we don't do */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">The difference</p>
            <h2 className="display mt-4 text-display-2 max-w-[20ch]">
              Intelligent training. Nothing left to chance.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {/* What you get */}
            <div className="bg-ink-900 p-8 lg:p-10">
              <Reveal>
                <p className="eyebrow">What you get</p>
              </Reveal>
              <ul className="mt-6 flex flex-col">
                {about.get.map((item, i) => (
                  <Reveal key={i} delay={i * 0.04} as="li">
                    <span className="flex items-start gap-4 border-b border-border py-3.5 leading-relaxed text-foreground last:border-b-0">
                      <span
                        className="mt-2 size-1.5 shrink-0 bg-brand"
                        aria-hidden
                      />
                      {item}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* What we don't do */}
            <div className="bg-ink-900 p-8 lg:p-10">
              <Reveal delay={0.06}>
                <p className="eyebrow">What we don’t do</p>
              </Reveal>
              <ul className="mt-6 flex flex-col">
                {about.dont.map((item, i) => (
                  <Reveal key={i} delay={0.06 + i * 0.04} as="li">
                    <span className="flex items-start gap-4 border-b border-border py-3.5 leading-relaxed text-muted-foreground last:border-b-0">
                      <span
                        className="mt-2 h-px w-3 shrink-0 bg-muted-foreground/60"
                        aria-hidden
                      />
                      {item}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="container-grit grid gap-12 py-24 lg:grid-cols-[0.6fr_1fr] lg:gap-20 lg:py-32">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-display-2">
              Strength Club, explained.
            </h2>
          </Reveal>
          <FaqAccordion faqs={strength.faqs} />
        </div>
      </section>

      {/* Conversion close — the two prioritized CTAs */}
      <section className="border-t border-border">
        <div className="container-grit py-28 text-center lg:py-40">
          <Reveal>
            <p className="eyebrow justify-center">Your starting line</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mx-auto mt-6 text-display-1 max-w-[16ch]">
              {about.cta.heading}
            </h2>
          </Reveal>

          <Reveal
            delay={0.16}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic strength={0.45}>
              <Link href="/contact" className="btn btn-solid px-8 py-4">
                Start with Assessment
              </Link>
            </Magnetic>
            <Link href="/membership" className="btn btn-outline px-8 py-4">
              Explore membership options
            </Link>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mx-auto mt-12 max-w-md text-sm leading-relaxed text-muted-foreground">
              {about.cta.standards}{" "}
              <Link
                href="/club-standards"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
              >
                {about.cta.standardsLink}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
