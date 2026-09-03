import type { Metadata } from "next";

import { manualTherapy, massageFormats, recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { FormatList } from "@/components/sections/format-list";
import { SiblingNav } from "@/components/sections/sibling-nav";
import { RecoveryClose } from "@/components/recovery/recovery-close";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Manual Therapy — Essential Recovery",
  description:
    "Hands-on massage-based recovery designed to release tension, restore movement and help training feel easier. Sports Massage, Deep Tissue and Mobility Reset.",
};

/** Session imagery keyed by format name for the alternating rows. */
const massageImages: Record<string, string> = {
  "Sports Massage": "/images/recovery/massage.jpg",
  "Deep Tissue Massage": "/images/recovery/deep-tissue.jpg",
  "Mobility Reset": "/images/recovery/mobility-reset.jpg",
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
        // Distinct from the Sports Massage row below, which uses massage.jpg.
        mediaSrc="/images/recovery/manual-therapy.jpg"
        mediaImagePosition="center 30%"
      />

      {/* Sessions — alternating editorial rows (text + image) */}
      <section className="border-t border-border">
        <div className="container-grit pt-12 lg:pt-16">
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
        <div className="container-grit section-sm grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">{manualTherapy.howToUse.eyebrow}</p>
            <h2 className="display mt-3 text-2xl sm:text-3xl max-w-[16ch]">
              {manualTherapy.howToUse.heading}
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {manualTherapy.howToUse.intro}
            </p>
          </Reveal>

          {/* Each row is one recommendation, not two columns of loose text.
              The session name leads at display size and the "If" condition sits
              beside it as supporting copy, so the eye lands on the answer first.
              Below `sm` the two halves stack, keeping the same read on a narrow
              screen. */}
          <div>
            <ul className="flex flex-col gap-3">
              {manualTherapy.howToUse.matches.map((m, i) => (
                <Reveal key={m.when} delay={i * 0.06}>
                  <li className="group flex flex-col gap-2 border border-border bg-ink-800/50 p-4 transition-colors hover:border-brand/40 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_1.5rem] sm:items-center sm:gap-5 sm:p-5">
                    <p className="display text-xl leading-tight text-foreground sm:text-2xl">
                      {m.then}
                    </p>

                    <p className="text-sm leading-snug text-muted-foreground sm:col-start-2">
                      <span className="eyebrow mr-2 text-muted-foreground">
                        If
                      </span>
                      {m.when}
                    </p>

                    <span
                      aria-hidden
                      className="hidden text-lg leading-none text-brand transition-transform group-hover:translate-x-1 sm:col-start-3 sm:block sm:justify-self-end"
                    >
                      →
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

      <SiblingNav eyebrow="More recovery" items={siblings} />
      <RecoveryClose />
    </>
  );
}
