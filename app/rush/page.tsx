import type { Metadata } from "next";
import Link from "next/link";

import { rush } from "@/content/rush";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { SquaresBackground } from "@/components/reactbits/squares-bg";
import { ScrambleText } from "@/components/reactbits/scramble-text";
import { CountUp } from "@/components/reactbits/count-up";
import { ShinyText } from "@/components/reactbits/shiny-text";

export const metadata: Metadata = {
  title: "RUSH — Move with Meaning",
  description:
    "RUSH is our signature training system. Every class has a purpose. Every session fits the bigger picture. Push hard. Move freely. Recover well. Come back better.",
};

export default function RushPage() {
  return (
    <>
      <PageHero
        eyebrow={rush.eyebrow}
        title={rush.signature}
        lead={[rush.writeup[0]]}
        backgroundImage="/images/hero/rush.jpg"
        textPosition="bottom-left"
        imagePosition="center 30%"
      />

      {/* Writeup statement */}
      <section className="container-grit section">
        <div className="mx-auto max-w-4xl space-y-6">
          {rush.writeup.slice(1).map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-xl font-light leading-[1.5] text-foreground sm:text-2xl">
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="display pt-4 text-display-2 text-foreground">
              <ShinyText speed={5}>{rush.closer}</ShinyText>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Models */}
      <section className="relative isolate border-t border-border">
        <SquaresBackground />
        <div className="container-grit section-sm">
          <Reveal>
            <p className="eyebrow">The Classes</p>
            <h2 className="display mt-4 text-display-2 max-w-[16ch]">
              Three models. One system.
            </h2>
          </Reveal>

          <div className="mt-8 grid border border-border lg:grid-cols-3">
            {rush.models.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.08}>
                <Link
                  href={m.href}
                  className="group flex h-full flex-col gap-6 border-b border-border p-8 transition-colors hover:bg-ink-800 last:border-b-0 lg:border-b-0 lg:[&:not(:last-child)]:border-r lg:border-border lg:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">
                      <CountUp to={m.count} suffix=" formats" />
                    </span>
                    <span className="text-brand opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                  <h3 className="display text-5xl transition-colors group-hover:text-brand">
                    <ScrambleText text={m.name} />
                  </h3>
                  <p className="mt-auto text-balance leading-relaxed text-muted-foreground">
                    {m.tagline}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-balance text-lg text-muted-foreground sm:text-xl">
              {rush.modelsCloser}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Conversion close — first-step CTA */}
      <section className="container-grit section text-center">
        <Reveal>
          <p className="eyebrow justify-center">Your first step starts here</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 text-display-1 max-w-[16ch]">
            Show up. Trust the process. Do the work.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Every first-timer begins with a complimentary assessment. No
            pressure. No expectations. Just a clear starting line.
          </p>
        </Reveal>

        <Reveal
          delay={0.24}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={0.45}>
            <Link href="/contact" className="btn btn-solid px-8 py-4">
              Book an Assessment
            </Link>
          </Magnetic>
          <Link href="/membership" className="btn btn-outline px-8 py-4">
            Explore membership options
          </Link>
        </Reveal>

        <Reveal delay={0.32}>
          <Link
            href="/first-timers"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
          >
            Learn what your first visit looks like
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="container-grit section grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-display-2">RUSH Class FAQ</h2>
          </Reveal>
          <div>
            <FaqAccordion faqs={rush.faqs} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-sm text-muted-foreground">
                {rush.faqNote}{" "}
                <Link
                  href="/contact"
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  Reach out to our team
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
