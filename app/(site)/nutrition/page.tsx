import type { Metadata } from "next";

import { nutrition } from "@/content/nutrition";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ScrollReveal } from "@/components/reactbits/scroll-reveal";
import { ShinyText } from "@/components/reactbits/shiny-text";

export const metadata: Metadata = {
  title: `${nutrition.name} — Training`,
  description: nutrition.lead,
};

export default function NutritionPage() {
  return (
    <>
      <PageHero
        eyebrow={nutrition.eyebrow}
        title={nutrition.name}
        lead={[nutrition.lead]}
        mediaLabel="Nutrition"
      />

      <section className="container-grit section">
        <div className="mx-auto max-w-3xl space-y-6">
          {nutrition.paras.map((p, i) => (
            <p
              key={i}
              className="text-balance text-xl font-light leading-[1.6] text-foreground"
            >
              <ScrollReveal>{p}</ScrollReveal>
            </p>
          ))}
          <p className="display pt-4 text-display-2 text-foreground">
            <ShinyText speed={5}>{nutrition.closer}</ShinyText>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
