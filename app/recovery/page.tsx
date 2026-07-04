import type { Metadata } from "next";
import Link from "next/link";

import { recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ShinyText } from "@/components/reactbits/shiny-text";

export const metadata: Metadata = {
  title: "Essential Recovery — Move between heat, cold, and manual therapy",
  description:
    "Recovery at Grit is part of the system. Sauna, cold plunge, contrast therapy, and manual therapy — designed to help you perform better, recover faster, and stay consistent.",
};

export default function RecoveryPage() {
  return (
    <>
      <PageHero
        eyebrow={recovery.eyebrow}
        title={recovery.signature}
        backgroundImage="/images/hero/recovery.jpg"
        textPosition="bottom-left"
        imagePosition="center 40%"
      />

      {/* Opening statement */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-4xl space-y-6">
          {recovery.intro.lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-xl font-light leading-[1.5] text-foreground sm:text-2xl">
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="display pt-4 text-display-2 text-foreground">
              <ShinyText speed={5}>{recovery.intro.closer}</ShinyText>
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works — four experiences */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{recovery.howItWorks.eyebrow}</p>
            <h2 className="display mt-4 text-display-2 max-w-[18ch]">
              {recovery.howItWorks.heading}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {recovery.experiences.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.08}>
                <Link
                  href={e.href}
                  className="group flex h-full flex-col gap-5 bg-ink-900 p-8 transition-colors hover:bg-ink-800 lg:p-10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="display text-2xl transition-colors group-hover:text-brand lg:text-3xl">
                      {e.name}
                    </h3>
                    <span className="text-brand opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                  <p className="mt-auto text-balance leading-relaxed text-muted-foreground">
                    {e.tagline}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion close */}
      <section className="container-grit py-28 text-center lg:py-40">
        <Reveal>
          <p className="eyebrow justify-center">{recovery.cta.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 text-display-1 max-w-[16ch]">
            {recovery.cta.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            {recovery.cta.body}
          </p>
        </Reveal>

        <Reveal
          delay={0.24}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={0.45}>
            <Link href="/contact" className="btn btn-solid px-8 py-4">
              Book Your Recovery →
            </Link>
          </Magnetic>
          <Link href="/membership" className="btn btn-outline px-8 py-4">
            Explore membership options
          </Link>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mx-auto mt-10 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {recovery.cta.carry}{" "}
            <Link
              href="#faq"
              className="group inline-flex items-center gap-1 text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              {recovery.cta.carryLink}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-border">
        <div className="container-grit grid gap-12 py-24 lg:grid-cols-[0.6fr_1fr] lg:gap-20 lg:py-32">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-display-2">
              Essential Recovery FAQ
            </h2>
          </Reveal>
          <div>
            <FaqAccordion faqs={recovery.faqs} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-sm text-muted-foreground">
                {recovery.faqNote}{" "}
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
