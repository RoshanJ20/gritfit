import type { Metadata } from "next";
import Link from "next/link";

import { rush } from "@/content/rush";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About RUSH",
  description:
    "RUSH is our signature training system. One day you’re chasing pace and fighting fatigue. The next you’re under the bar, building strength.",
};

export default function AboutRushPage() {
  return (
    <>
      <PageHero
        eyebrow="RUSH by Grit Fit"
        title="About RUSH"
        lead={[rush.signature]}
        mediaLabel="RUSH"
        mediaKind="video"
      />

      {/* The story */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-4xl space-y-7">
          {rush.writeup.map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-2xl font-light leading-[1.5] text-foreground sm:text-3xl">
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="display pt-2 text-display-2 text-foreground">
              {rush.closer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* What's inside */}
      <section className="border-t border-border">
        <div className="container-grit py-16 lg:py-20">
          <Reveal>
            <p className="eyebrow">Inside RUSH</p>
            <h2 className="display mt-4 text-display-2">Explore the classes</h2>
          </Reveal>
          <div className="mt-10 flex flex-col">
            {rush.models.map((m, i) => (
              <Reveal key={m.key} delay={i * 0.06}>
                <Link
                  href={m.href}
                  className="group flex flex-col gap-2 border-t border-border py-7 transition-colors last:border-b hover:text-brand sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                >
                  <span className="display text-4xl sm:text-5xl">{m.name}</span>
                  <span className="max-w-md text-balance text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                    {m.tagline}
                  </span>
                  <span className="hidden text-brand transition-transform group-hover:translate-x-1 sm:block">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
