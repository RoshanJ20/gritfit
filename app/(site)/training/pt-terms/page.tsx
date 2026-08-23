import type { Metadata } from "next";

import { training } from "@/content/training";
import { PageHero } from "@/components/sections/page-hero";
import { SectionAccordion } from "@/components/sections/section-accordion";
import { TrainingCta } from "@/components/sections/training-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "PT Terms & Expectations",
  description:
    "Personal training at Grit Fit operates on a structured coaching agreement. Membership, bookings, cancellations, session validity, coach assignment, payment and training etiquette.",
};

export default function PtTermsPage() {
  return (
    <>
      <PageHero
        eyebrow={training.ptTerms.eyebrow}
        title="PT Terms & Expectations"
        lead={[training.ptTerms.intro]}
        mediaLabel="Personal Training"
        mediaSrc="/images/training/one-on-one.jpg"
      />

      <section className="border-t border-border">
        <div className="container-grit section">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">The agreement</p>
                <h2 className="display mt-4 max-w-[16ch] text-display-2">
                  What we ask of every PT client.
                </h2>
              </div>
            </Reveal>
            <SectionAccordion sections={training.ptTerms.sections} />
          </div>
        </div>
      </section>

      <TrainingCta showEtiquette={false} />
    </>
  );
}
