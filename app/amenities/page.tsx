import type { Metadata } from "next";

import { amenities } from "@/content/amenities";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CountUp } from "@/components/reactbits/count-up";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

export const metadata: Metadata = {
  title: "Amenities — Built into every detail",
  description:
    "Modern locker rooms, private changing areas, showers, towel service, parking, and complete on-site security.",
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        eyebrow={amenities.eyebrow}
        title={amenities.heading}
        mediaLabel="Amenities"
        mediaSrc="/images/amenities.jpg"
      />

      <section className="container-grit py-20 lg:py-28">
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {amenities.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.06}>
              <div className="group relative isolate flex h-full flex-col gap-4 overflow-hidden bg-ink-900 p-8 transition-colors hover:bg-ink-800 lg:p-10">
                <SpotlightOverlay className="-z-10" />
                {/* brand hairline wipes in along the top edge on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
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
      <section className="container-grit pb-20 lg:pb-28">
        <Reveal>
          <ParallaxMedia amount={28} className="rounded-md">
            <MediaPlaceholder
              label="Amenities"
              kind="image"
              ratio="wide"
              src="/images/amenities-about.jpg"
              className="rounded-none border-0"
            />
          </ParallaxMedia>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
