import type { Metadata } from "next";

import { amenities } from "@/content/amenities";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Amenities",
  description:
    "Privacy and comfort, built into every detail. Modern locker rooms, private changing areas, showers, towel service, parking, and on-site security.",
};

export default function AboutAmenitiesPage() {
  return (
    <>
      <PageHero
        eyebrow={amenities.eyebrow}
        title="About Amenities"
        lead={[amenities.heading]}
        mediaLabel="Amenities"
        mediaSrc="/images/amenities-about.jpg"
      />

      <section className="container-grit py-16 lg:py-24">
        <div className="flex flex-col">
          {amenities.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 2) * 0.05}>
              <div className="grid gap-2 border-t border-border py-8 last:border-b sm:grid-cols-[0.4fr_1fr] sm:gap-10 lg:py-10">
                <h2 className="display text-3xl sm:text-4xl">{item.name}</h2>
                <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:self-center">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
