import type { Metadata } from "next";

import { training } from "@/content/training";
import { programs } from "@/content/programs";
import { PageHero } from "@/components/sections/page-hero";
import { LinkList } from "@/components/sections/link-list";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Callout } from "@/components/sections/callout";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/reactbits/count-up";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

export const metadata: Metadata = {
  title: "Training — Coaching makes champions",
  description:
    "An elite team of trainers from diverse disciplines, united by one mission — helping you achieve more. 1-on-1 coaching and semi-private training.",
};

const programLinks = programs.map((p) => ({
  name: p.name,
  href: p.href,
  note: p.lead,
}));

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow={training.eyebrow}
        title={training.signature}
        lead={[training.explore[0]]}
        mediaLabel="Training"
        mediaSrc="/images/training/one-on-one.jpg"
      />

      {/* Explore statement */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-4xl space-y-6">
          {training.explore.slice(1).map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-xl font-light leading-[1.55] text-foreground sm:text-2xl">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we coach — offerings */}
      <section className="border-t border-border">
        <div className="container-grit py-16 lg:py-20">
          <Reveal>
            <p className="eyebrow">How we coach</p>
            <h2 className="display mt-4 text-display-2">
              Same coaching. Different environment.
            </h2>
          </Reveal>
        </div>
        <div className="grid border-t border-border md:grid-cols-2">
          {training.offerings.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.08}>
              <div className="group relative isolate flex h-full flex-col gap-4 overflow-hidden border-b border-border p-8 md:border-b-0 md:p-10 md:[&:first-child]:border-r md:[&:first-child]:border-border">
                <SpotlightOverlay className="-z-10" />
                <span className="display text-2xl text-brand">
                  <CountUp to={i + 1} pad={2} />
                </span>
                <h3 className="display text-3xl">{o.name}</h3>
                <p className="leading-relaxed text-muted-foreground">{o.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container-grit py-8">
          <Reveal>
            <p className="text-balance text-lg text-muted-foreground">
              {training.offeringsShared}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Membership note */}
      <section className="container-grit py-12 lg:py-16">
        <Callout glow label="Please note">
          {training.membershipNote}
        </Callout>
      </section>

      {/* Programs */}
      <LinkList eyebrow="Programs" items={programLinks} />

      {/* PT FAQ */}
      <section className="border-t border-border">
        <div className="container-grit grid gap-12 py-24 lg:grid-cols-[0.6fr_1fr] lg:gap-20 lg:py-32">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-display-2">
              Personal training, explained.
            </h2>
          </Reveal>
          <FaqAccordion faqs={training.faqs} />
        </div>
      </section>

      {/* Coaches + testimonials links */}
      <LinkList
        items={[
          {
            name: "Meet the coaches",
            href: "/training/coaches",
            note: "An elite team, united by humility, consistency, and continuous learning.",
          },
          {
            name: "Testimonials",
            href: "/training/testimonials",
            note: "Trusted by professionals, loved by beginners.",
          },
        ]}
      />

      <CtaBand
        eyebrow="Personal Training"
        heading={training.matchHeading}
        body={training.matchBody}
      />
    </>
  );
}
