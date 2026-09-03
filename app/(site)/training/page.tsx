import type { Metadata } from "next";

import { training } from "@/content/training";
import { programs } from "@/content/programs";
import { PageHero } from "@/components/sections/page-hero";
import { LinkList } from "@/components/sections/link-list";
import { TrainingPrograms } from "@/components/sections/training-programs";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { TrainingCta } from "@/components/sections/training-cta";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";
import { ShinyText } from "@/components/reactbits/shiny-text";

export const metadata: Metadata = {
  title: "Training — Coaching makes champions",
  description:
    "An elite team of trainers from diverse disciplines, united by one mission — helping you achieve more. 1-on-1 coaching and semi-private training.",
};

// Programs shown on this page as three broad category cards that lift open on
// hover to reveal the individual programs inside each:
//  1. Core Programs — Strong Start, Strong Performance.
//  2. Nutrition — a single program linking to its own page.
//  3. Specialised Coaching — Athletic Youth, Injury Return, Postnatal.
const toLink = (p: (typeof programs)[number]) => ({
  name: p.name,
  href: p.href,
  note: p.lead,
  image: `/images/programs/${p.slug}.jpg`,
});

const programCategories = [
  {
    name: "Core Programs",
    intro:
      "The foundation of how we coach — from building a stronger, healthier body to training for performance.",
    // Its own photo — the programs inside carry /images/programs/*.jpg.
    image: "/images/training/core-programs.jpg",
    programs: programs.filter((p) => p.group === "core").map(toLink),
  },
  {
    name: "Nutrition",
    intro: "Fuel the work.",
    // Its own photo — /images/nutrition.jpg carries the Nutrition page hero.
    image: "/images/training/nutrition.jpg",
    programs: [
      {
        name: "Nutrition Coaching",
        href: "/nutrition",
        note: "Personalised nutrition to fuel your training, recovery and results.",
      },
    ],
  },
  {
    name: "Specialised Coaching",
    intro:
      "Expert guidance for specific stages of life, recovery and athletic development.",
    // Its own photo — the programs inside carry /images/programs/*.jpg.
    image: "/images/training/specialised.jpg",
    programs: programs.filter((p) => p.group === "specialised").map(toLink),
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow={training.eyebrow}
        title={training.signature}
        lead={[training.subtitle]}
        backgroundImage="/images/training/coaching.jpg"
        textPosition="bottom-left"
      />

      {/* Explore statement */}
      <section className="container-grit section">
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
      <TrainingPrograms eyebrow="Programs" categories={programCategories} />

      {/* Membership note */}
      <section className="container-grit section-sm">
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

      {/* PT FAQ */}
      <section className="border-t border-border">
        <div className="container-grit section grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:gap-20">
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
            note: "An elite team, united by humility, consistency and continuous learning.",
          },
          {
            name: "Testimonials",
            href: "/training/testimonials",
            note: "Trusted by professionals, loved by beginners.",
          },
        ]}
      />

      {/* Closing CTA — last on the page, as on every other Trainings page and
          across RUSH, so the section reads content first and closes on the ask. */}
      <TrainingCta />
    </>
  );
}
