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

      {/* How to use — same shape as the "More programs" rows on Trainings:
          a heading block, then full-width hairline rows where the session name
          leads at display size and the line beside it says whose week it is.
          The rows are advice, not links, so they carry no arrow or hover. */}
      <section className="border-t border-border">
        <div className="container-grit section-sm">
          <Reveal>
            <p className="eyebrow">{manualTherapy.howToUse.eyebrow}</p>
            <h2 className="display mt-4 max-w-[20ch] text-display-2">
              {manualTherapy.howToUse.heading}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {manualTherapy.howToUse.intro}
            </p>
          </Reveal>

          <ul className="mt-10 flex flex-col">
            {manualTherapy.howToUse.matches.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <li className="flex flex-col gap-2 border-t border-border py-7 last:border-b sm:grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:items-center sm:gap-8">
                  <span className="display text-3xl sm:text-4xl">{m.name}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground sm:col-start-2">
                    {m.note}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {manualTherapy.howToUse.guide}
            </p>
          </Reveal>
        </div>
      </section>

      <SiblingNav eyebrow="More recovery" items={siblings} />
      <RecoveryClose />
    </>
  );
}
