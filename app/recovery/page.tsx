import type { Metadata } from "next";

import { recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { SiblingNav } from "@/components/sections/sibling-nav";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ContrastHeading } from "@/components/recovery/contrast-heading";
import { AnimatedList } from "@/components/reactbits/animated-list";

export const metadata: Metadata = {
  title: "Essential Recovery — The Recovery Zone",
  description:
    "Where recovery hits different. Contrast therapy — move between infrared heat and cold immersion. Two extremes, one purpose.",
};

const offerings = recovery.offerings.map(({ name, href, tagline }) => ({
  name,
  href,
  tagline,
}));

const firstTimers = [
  { title: "What to wear", items: recovery.firstTimers.wear },
  { title: "What to bring", items: recovery.firstTimers.bring },
];

export default function RecoveryPage() {
  return (
    <>
      <PageHero
        eyebrow={recovery.eyebrow}
        title={recovery.signature}
        lead={[recovery.contrast.lines[1]]}
        backgroundImage="/images/hero/recovery.jpg"
        textPosition="bottom-left"
        imagePosition="center 40%"
      />

      {/* Contrast therapy */}
      <section className="container-grit py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{recovery.contrast.eyebrow}</p>
            <ContrastHeading className="mt-4 text-display-2" />
          </Reveal>
          <div className="flex flex-col justify-center gap-6">
            {recovery.contrast.lines.slice(1).map((line, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-balance text-xl leading-relaxed text-muted-foreground">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.05} className="mt-16">
          <MediaPlaceholder
            label="Contrast Therapy"
            kind="image"
            ratio="wide"
            interactive
            src="/images/recovery/contrast.jpg"
            imagePosition="center 40%"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="display mx-auto mt-20 max-w-[20ch] text-balance text-center text-display-2 text-foreground">
            {recovery.contrast.question}
          </p>
        </Reveal>
      </section>

      {/* Offerings */}
      <SiblingNav eyebrow="The Offerings" items={offerings} />

      {/* First session */}
      <section className="container-grit py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Your first recovery session</p>
              <h2 className="display mt-4 text-display-2">
                {recovery.firstSession.intro}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                {recovery.firstSession.lead}
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col justify-center">
            <ul className="flex flex-col">
              {recovery.firstSession.bring.map((item, i) => (
                <Reveal key={i} delay={i * 0.05} as="li">
                  <span className="flex items-center gap-4 border-b border-border py-4 text-lg text-foreground">
                    <span className="size-1.5 shrink-0 bg-brand" aria-hidden />
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm text-muted-foreground">
                {recovery.firstSession.note}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="display mt-6 text-2xl text-foreground">
                {recovery.firstSession.closer}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Before your first session */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Before your first session</p>
            <h2 className="display mt-4 text-display-2">Show up as you are.</h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {firstTimers.map((col, c) => (
              <div key={col.title} className="bg-ink-900 p-8 lg:p-10">
                <Reveal delay={c * 0.06}>
                  <p className="eyebrow">{col.title}</p>
                </Reveal>
                <AnimatedList className="mt-6" items={col.items} />
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl space-y-4">
            {recovery.firstTimers.doText.map((line, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="leading-relaxed text-muted-foreground">{line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border">
        <div className="container-grit grid gap-12 py-24 lg:grid-cols-[0.6fr_1fr] lg:gap-20 lg:py-32">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-display-2">Recovery, explained.</h2>
          </Reveal>
          <FaqAccordion faqs={recovery.faqs} />
        </div>
      </section>

      <CtaBand
        eyebrow="The Recovery Zone"
        heading="Recovery is training."
        body="Arrive 10 minutes early, bring swimwear, a towel, and water. Our team will guide you through the process and recommended exposure times."
      />
    </>
  );
}
