import type { Metadata } from "next";

import { recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Recovery",
  description:
    "Contrast therapy. Move between infrared heat and cold immersion — two extremes, one purpose. What changes when you learn to stay calm in the extremes?",
};

const firstTimers = [
  { title: "What to wear", items: recovery.firstTimers.wear },
  { title: "What to bring", items: recovery.firstTimers.bring },
];

export default function AboutRecoveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Essential Recovery"
        title="About Recovery"
        lead={[recovery.signature]}
        mediaLabel="The Recovery Zone"
      />

      {/* Contrast therapy, deeper */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="eyebrow">{recovery.contrast.eyebrow}</p>
          </Reveal>
          <div className="mt-8 space-y-6">
            {recovery.contrast.lines.map((line, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-balance text-2xl font-light leading-[1.5] text-foreground sm:text-3xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="display mt-12 text-balance text-display-2 text-foreground">
              {recovery.contrast.question}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Before your first session */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Before your first session</p>
            <h2 className="display mt-4 text-display-2">Show up as you are.</h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {firstTimers.map((col, c) => (
              <div key={col.title} className="bg-ink-900 p-8 lg:p-10">
                <Reveal delay={c * 0.06}>
                  <p className="eyebrow">{col.title}</p>
                </Reveal>
                <ul className="mt-6 flex flex-col">
                  {col.items.map((item, i) => (
                    <Reveal key={i} delay={c * 0.06 + i * 0.04} as="li">
                      <span className="flex items-center gap-4 border-b border-border py-3.5 text-foreground last:border-b-0">
                        <span className="size-1.5 shrink-0 bg-brand" aria-hidden />
                        {item}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl space-y-4">
            {recovery.firstTimers.doText.map((line, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="leading-relaxed text-muted-foreground">{line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="The Recovery Zone"
        heading="Heat. Cold. Reset."
        body="Recovery is for everyone. You’ll be guided throughout. Heat, cold, or both — based on your recovery needs."
      />
    </>
  );
}
