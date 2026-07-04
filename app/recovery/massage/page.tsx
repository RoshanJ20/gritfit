import type { Metadata } from "next";
import Link from "next/link";

import { manualTherapy, recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { SiblingNav } from "@/components/sections/sibling-nav";
import { Callout } from "@/components/sections/callout";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export const metadata: Metadata = {
  title: "Manual Therapy — Essential Recovery",
  description:
    "Hands-on massage-based recovery designed to release tension, restore movement, and help training feel easier. Sports Massage, Deep Tissue, and Mobility Reset.",
};

const siblings = recovery.experiences.filter(
  (e) => e.href !== "/recovery/massage",
);

export default function ManualTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow={manualTherapy.eyebrow}
        title={manualTherapy.name}
        lead={[manualTherapy.lead]}
        mediaLabel="Manual Therapy"
        mediaSrc="/images/recovery/massage.jpg"
        mediaImagePosition="center 30%"
      />

      {/* Services */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">The sessions</p>
            <h2 className="display mt-4 text-display-2 max-w-[20ch]">
              Three ways to recover.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {manualTherapy.services.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col gap-5 bg-ink-900 p-8 lg:p-10">
                  <div>
                    <h3 className="display text-2xl text-foreground lg:text-3xl">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.1em] text-brand">
                      {s.tagline}
                    </p>
                  </div>

                  <div className="space-y-3 leading-relaxed text-muted-foreground">
                    {s.paras.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>

                  <ul className="flex flex-col gap-2.5 text-sm text-foreground">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-0.5 shrink-0 text-brand" aria-hidden>
                          ✓
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto border-t border-border pt-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Best for:
                    </span>{" "}
                    {s.bestFor}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{manualTherapy.howToUse.eyebrow}</p>
            <h2 className="display mt-4 text-display-2 max-w-[20ch]">
              {manualTherapy.howToUse.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-muted-foreground">
              {manualTherapy.howToUse.intro}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {manualTherapy.howToUse.matches.map((m, i) => (
              <Reveal key={m.when} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 bg-ink-900 p-8">
                  <p className="text-muted-foreground">{m.when}</p>
                  <p className="flex items-center gap-2 text-xl font-medium text-foreground">
                    <span className="text-brand" aria-hidden>
                      →
                    </span>
                    {m.then}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {manualTherapy.howToUse.guide}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Note */}
      <section className="border-t border-border">
        <div className="container-grit py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Callout label="Note">{manualTherapy.note}</Callout>
          </div>
        </div>
      </section>

      {/* Packages / Pricing */}
      <section className="border-t border-border">
        <div className="container-grit py-24 text-center lg:py-28">
          <Reveal>
            <p className="eyebrow justify-center">Packages &amp; Pricing</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="display mx-auto mt-5 text-display-2">
              <Placeholder label="Pricing">
                Packages &amp; pricing at the club
              </Placeholder>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-grit py-24 text-center lg:py-32">
        <Reveal>
          <p className="eyebrow justify-center">Your journey starts here.</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 text-display-1 max-w-[16ch]">
            Recovery is training.
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-10 flex justify-center">
          <Magnetic strength={0.45}>
            <Link href="/contact" className="btn btn-solid px-9 py-4">
              Book a Recovery Session
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      <SiblingNav eyebrow="More recovery" items={siblings} />
    </>
  );
}
