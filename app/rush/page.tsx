import type { Metadata } from "next";
import Link from "next/link";

import { rush } from "@/content/rush";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

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
      <section className="container-grit py-24 lg:py-36">
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
              {rush.closer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Models */}
      <section className="border-t border-border">
        <div className="container-grit py-16 lg:py-20">
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
                    <span className="eyebrow">{m.count} formats</span>
                    <span className="text-brand opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                  <h3 className="display text-5xl transition-colors group-hover:text-brand">
                    {m.name}
                  </h3>
                  <p className="mt-auto text-balance leading-relaxed text-muted-foreground">
                    {m.tagline}
                  </p>
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
