import type { Metadata } from "next";
import Link from "next/link";

import { strength } from "@/content/strength";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export const metadata: Metadata = {
  title: "About Strength Club",
  description:
    "Every member begins with a comprehensive assessment, then follows a structured training pathway on The Floor. No guesswork. No distractions. Just intelligent training and measurable progress.",
};

const { about } = strength;

export default function AboutStrengthClubPage() {
  return (
    <>
      <PageHero
        eyebrow={strength.eyebrow}
        title="About Strength Club"
        lead={[about.lead]}
        mediaLabel="Strength Club"
        mediaKind="video"
      />

      {/* Statement — The Floor */}
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

      {/* What you get / What we don't do */}
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
