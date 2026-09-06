import type { Metadata } from "next";

import { amenities } from "@/content/amenities";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal, Curtain } from "@/components/motion/reveal";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CardEdge } from "@/components/sections/card-edge";
import { CountUp } from "@/components/reactbits/count-up";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

export const metadata: Metadata = {
  title: "Amenities — Quality built into every detail",
  description:
    "Modern locker rooms, private changing areas, showers, the Hydration Station, limited member parking and complete on-site security.",
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        eyebrow={amenities.eyebrow}
        title={amenities.heading}
        lead={[amenities.lead]}
        backgroundImage="/images/amenities.jpg"
        textPosition="bottom-left"
        imagePosition="center 45%"
      />

      <section className="container-grit section">
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {amenities.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.06}>
              <div className="card-charge group flex h-full flex-col gap-4 bg-ink-900 p-8 transition-colors hover:bg-ink-800 lg:p-10">
                <SpotlightOverlay className="-z-10" />
                {/* The top-edge hairline this card used to draw by hand is now
                    part of CardEdge, alongside the corner ticks. */}
                <CardEdge />
                <span className="display text-xl text-brand">
                  <CountUp to={i + 1} pad={2} />
                </span>
                <h2 className="display text-2xl">{item.name}</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Full-width amenities banner */}
      <section className="container-grit pb-12 lg:pb-16">
        <Curtain className="rounded-md">
          <MediaPlaceholder
            label="Amenities"
            kind="image"
            ratio="wide"
            src="/images/hero/strength.jpg"
            className="rounded-none border-0"
          />
        </Curtain>
      </section>
    </>
  );
}
