import type { Metadata } from "next";

import { training } from "@/content/training";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";

export const metadata: Metadata = {
  title: "Offerings — Training",
  description:
    "1-on-1 coaching and semi-private training. Both are built around you. The environment is what changes.",
};

export default function OfferingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Offerings"
        lead={[training.offeringsShared]}
        mediaLabel="Coaching"
        mediaKind="video"
      />

      {training.offerings.map((o, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={o.name} className="border-b border-border">
            <div className="container-grit grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
              <Reveal className={flip ? "lg:order-2" : ""} y={40}>
                <ParallaxMedia amount={34} className="aspect-[4/3]">
                  <MediaPlaceholder
                    label={o.name}
                    kind="image"
                    ratio="auto"
                    className="h-full rounded-none border-0"
                  />
                </ParallaxMedia>
              </Reveal>
              <div className={flip ? "lg:order-1" : ""}>
                <Reveal>
                  <span className="display text-2xl text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-display-2">{o.name}</h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                    {o.desc}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        );
      })}

      <section className="container-grit py-16 text-center lg:py-20">
        <Reveal>
          <p className="display mx-auto max-w-[20ch] text-display-2 text-foreground">
            {training.offeringsShared}
          </p>
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

      <CtaBand
        eyebrow="Personal Training"
        heading={training.matchHeading}
        body={training.matchBody}
      />
    </>
  );
}
