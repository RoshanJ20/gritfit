import type { Metadata } from "next";
import Link from "next/link";

import { recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { CardEdge } from "@/components/sections/card-edge";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { RecoveryClose } from "@/components/recovery/recovery-close";
import { Reveal } from "@/components/motion/reveal";
import { ShinyText } from "@/components/reactbits/shiny-text";

export const metadata: Metadata = {
  title: "Essential Recovery — Move between heat, cold and manual therapy",
  description:
    "Recovery at Grit Fit is part of the system. Sauna, cold plunge, contrast therapy and manual therapy — designed to help you perform better, recover faster and stay consistent.",
};

export default function RecoveryPage() {
  return (
    <>
      <PageHero
        eyebrow={recovery.eyebrow}
        title={recovery.signature}
        lead={[recovery.subtitle]}
        backgroundImage="/images/hero/recovery.jpg"
        textPosition="bottom-left"
        imagePosition="center 40%"
      />

      {/* Opening statement */}
      <section className="container-grit section">
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
        <div className="container-grit section">
          <Reveal>
            <p className="eyebrow">{recovery.howItWorks.eyebrow}</p>
            <h2 className="display mt-4 text-display-2 max-w-[18ch]">
              {recovery.howItWorks.heading}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {recovery.experiences.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.08}>
                <Link
                  href={e.href}
                  className="card-charge group flex h-full flex-col gap-5 bg-ink-900 p-8 transition-colors hover:bg-ink-800 lg:p-10"
                >
                  <CardEdge />
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

      {/* What to carry — the list itself, not a link to it. The old "See what
          to carry" button pointed at the FAQ, where the answer sat collapsed
          behind an accordion, so the promise never actually paid off. */}
      <section className="border-t border-border">
        <div className="container-grit section grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{recovery.whatToCarry.eyebrow}</p>
            <h2 className="display mt-4 text-display-2 max-w-[16ch]">
              {recovery.whatToCarry.heading}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              {recovery.cta.carry}
            </p>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-muted-foreground">
                {recovery.firstSession.lead}
              </p>
            </Reveal>
            <ul className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {recovery.firstSession.bring.map((item, i) => (
                <Reveal key={item} delay={(i % 2) * 0.06}>
                  <li className="flex h-full items-start gap-3 bg-ink-900 p-5">
                    <span aria-hidden className="text-brand">
                      →
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.12}>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {recovery.firstSession.note}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-border">
        <div className="container-grit section grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:gap-20">
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

      <RecoveryClose />
    </>
  );
}
