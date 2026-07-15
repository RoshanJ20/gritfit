import type { Metadata } from "next";
import Link from "next/link";

import { manualTherapy, massageFormats, recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { FormatList } from "@/components/sections/format-list";
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

/**
 * Session imagery keyed by format name for the alternating rows. Sports Massage
 * uses the real hands-on photo; Deep Tissue and Mobility Reset fall through to
 * the branded placeholder until their photography lands — drop
 * `/images/recovery/deep-tissue.jpg` and `/images/recovery/mobility-reset.jpg`
 * in and add the keys here to swap them in.
 */
const massageImages: Record<string, string> = {
  "Sports Massage": "/images/recovery/massage.jpg",
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

      {/* Sessions — alternating editorial rows (text + image) */}
      <section className="border-t border-border">
        <div className="container-grit pt-24 lg:pt-32">
          <Reveal>
            <p className="eyebrow">The sessions</p>
            <h2 className="display mt-4 text-display-2 max-w-[20ch]">
              Three ways to recover.
            </h2>
          </Reveal>
        </div>

        <FormatList
          formats={massageFormats}
          mediaKind="image"
          images={massageImages}
        />
      </section>

      {/* How to use — compact two-column */}
      <section className="border-t border-border">
        <div className="container-grit grid gap-8 py-14 lg:grid-cols-[0.75fr_1fr] lg:items-center lg:gap-16 lg:py-16">
          <Reveal>
            <p className="eyebrow">{manualTherapy.howToUse.eyebrow}</p>
            <h2 className="display mt-3 text-2xl sm:text-3xl max-w-[16ch]">
              {manualTherapy.howToUse.heading}
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {manualTherapy.howToUse.intro}
            </p>
          </Reveal>

          <div>
            <ul className="border-y border-border">
              {manualTherapy.howToUse.matches.map((m, i) => (
                <Reveal key={m.when} delay={i * 0.06}>
                  <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border py-3.5 last:border-b-0">
                    <span className="text-sm text-muted-foreground">
                      {m.when}
                    </span>
                    <span className="flex items-center gap-2.5 font-medium text-foreground">
                      <span
                        className="size-1.5 shrink-0 bg-brand"
                        aria-hidden
                      />
                      {m.then}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.12}>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {manualTherapy.howToUse.guide}
              </p>
            </Reveal>
          </div>
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
