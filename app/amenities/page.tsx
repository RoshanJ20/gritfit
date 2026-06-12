import type { Metadata } from "next";

import { amenities } from "@/content/amenities";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

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
      />

      <section className="container-grit py-20 lg:py-28">
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {amenities.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col gap-4 bg-ink-900 p-8 transition-colors hover:bg-ink-800 lg:p-10">
                <span className="display text-xl text-brand">
                  {String(i + 1).padStart(2, "0")}
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

      <CtaBand />
    </>
  );
}
