import type { Metadata } from "next";

import { testimonials } from "@/content/team";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "Testimonials — Client Voices",
  description: "Trusted by professionals, loved by beginners.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow={testimonials.eyebrow}
        title={testimonials.heading}
        lead={[testimonials.tagline]}
        mediaLabel="Client Voices"
      />

      <section className="container-grit py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow">Reviews</p>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Real client reviews are being collected and will appear here.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {Array.from({ length: testimonials.placeholderCount }).map((_, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06}>
              <figure className="flex h-full flex-col justify-between gap-8 border border-border p-8 lg:p-10">
                <blockquote className="text-lg leading-relaxed text-muted-foreground">
                  <Placeholder label="Review">
                    Actual review — coming soon
                  </Placeholder>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="size-10 shrink-0 border border-border bg-ink-800" />
                  <Placeholder label="Client">Client name</Placeholder>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
