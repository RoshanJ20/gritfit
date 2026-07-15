import type { Metadata } from "next";
import Link from "next/link";

import { training } from "@/content/training";
import { programs } from "@/content/programs";
import { primaryCta, secondaryCta } from "@/content/nav";
import { PageHero } from "@/components/sections/page-hero";
import { LinkList } from "@/components/sections/link-list";
import { TrainingPrograms } from "@/components/sections/training-programs";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ShinyText } from "@/components/reactbits/shiny-text";

export const metadata: Metadata = {
  title: "Training — Coaching makes champions",
  description:
    "An elite team of trainers from diverse disciplines, united by one mission — helping you achieve more. 1-on-1 coaching and semi-private training.",
};

// Programs shown on this page as an editorial accordion, in three chapters:
//  1. Core Programs — Strong Start, Strong Performance.
//  2. Nutrition — a single text-led row linking to its own page.
//  3. Specialised Coaching — Athletic Youth, Injury Return, Postnatal.
const toRow = (p: (typeof programs)[number]) => ({
  name: p.name,
  href: p.href,
  lead: p.lead,
  blurb: p.paras[0],
  image: `/images/programs/${p.slug}.jpg`,
});

const programSections = [
  {
    label: "Core Programs",
    intro:
      "The foundation of how we coach — from building a stronger, healthier body to training for performance.",
    rows: programs.filter((p) => p.group === "core").map(toRow),
  },
  {
    label: "Nutrition",
    intro: "Fuel the work.",
    rows: [
      {
        name: "Nutrition",
        href: "/nutrition",
        lead: "Personalised nutrition coaching to fuel your training, recovery, and results.",
        cta: "Explore nutrition",
      },
    ],
  },
  {
    label: "Specialised Coaching",
    intro:
      "Some goals require more than a standard program — expert guidance for specific stages of life, recovery, and athletic development.",
    rows: programs.filter((p) => p.group === "specialised").map(toRow),
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow={training.eyebrow}
        title={training.signature}
        lead={[training.subtitle]}
        backgroundImage="/images/training/index-hero.jpg"
        textPosition="bottom-left"
      />

      {/* Explore statement */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-4xl space-y-6">
          {training.explore.map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-xl font-light leading-[1.55] text-foreground sm:text-2xl">
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="display pt-4 text-display-2 text-foreground">
              <ShinyText speed={5}>{training.closer}</ShinyText>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <TrainingPrograms eyebrow="Programs" sections={programSections} />

      {/* Membership note */}
      <section className="container-grit py-12 lg:py-16">
        <Callout glow label="Please note">
          {training.membershipNote}
        </Callout>
      </section>

      {/* How we coach — subtle inline note */}
      <section className="container-grit pb-4">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">How we coach</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-lg text-foreground">
              Same coaching. Different environment.
            </p>
          </Reveal>
          <div className="mt-5 space-y-3">
            {training.offerings.map((o, i) => (
              <Reveal key={o.name} delay={0.1 + i * 0.05}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{o.name}.</span>{" "}
                  {o.desc}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.22}>
            <p className="mt-5 text-sm text-muted-foreground">
              {training.offeringsShared}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our standard — closing CTA */}
      <section className="container-grit py-28 text-center lg:py-36">
        <Reveal>
          <p className="eyebrow justify-center">{training.standard.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 text-display-1 max-w-[18ch]">
            {training.standard.heading}
          </h2>
        </Reveal>
        <Reveal
          delay={0.16}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={0.45}>
            <Link href={secondaryCta.href} className="btn btn-solid px-8 py-4">
              Start Assessment
            </Link>
          </Magnetic>
          <Link href={primaryCta.href} className="btn btn-outline px-8 py-4">
            Train With Us
          </Link>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-12 max-w-xl text-balance text-muted-foreground">
            {training.standard.etiquetteNote}
          </p>
          <Link
            href={training.standard.etiquetteHref}
            className="group mt-4 inline-flex items-center gap-2 text-brand transition-colors hover:text-brand/80"
          >
            {training.standard.etiquetteLabel}
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </section>

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
    </>
  );
}
