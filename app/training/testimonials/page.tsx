import type { Metadata } from "next";

import { testimonials } from "@/content/team";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Placeholder } from "@/components/placeholder";
import { Carousel } from "@/components/reactbits/carousel";

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
        mediaSrc="/images/training/client-voices.jpg"
      />

      <section className="container-grit py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow">Reviews</p>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Real client reviews are being collected and will appear here.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <Carousel>
            {Array.from({ length: testimonials.placeholderCount }).map((_, i) => (
              <figure
                key={i}
                className="relative flex h-full min-h-[17rem] flex-col justify-between gap-8 overflow-hidden border border-border bg-ink-900 p-8 transition-colors hover:border-brand/40 lg:p-10"
              >
                <span
                  aria-hidden
                  className="display pointer-events-none absolute -right-1 -top-8 select-none text-[8rem] leading-none text-brand/10"
                >
                  &rdquo;
                </span>
                <blockquote className="relative text-lg leading-relaxed text-muted-foreground">
                  <Placeholder label="Review">
                    Actual review — coming soon
                  </Placeholder>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="size-10 shrink-0 rounded-full border border-border bg-ink-800" />
                  <Placeholder label="Client">Client name</Placeholder>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
