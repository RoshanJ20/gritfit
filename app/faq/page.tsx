import type { Metadata } from "next";

import { startersFaqs, rushFaqs, generalFaqs } from "@/content/faq";
import { training } from "@/content/training";
import { strength } from "@/content/strength";
import { recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "FAQ — Everything you need to know",
  description:
    "Answers for first-timers, RUSH, personal training, Strength Club, recovery, and the Grit Fit way.",
};

const sections = [
  { value: "starters", label: "Starters", faqs: startersFaqs },
  { value: "rush", label: "RUSH", faqs: rushFaqs },
  { value: "pt", label: "Personal Training", faqs: training.faqs },
  { value: "strength", label: "Strength Club", faqs: strength.faqs },
  { value: "recovery", label: "Recovery", faqs: recovery.faqs },
  { value: "general", label: "General", faqs: generalFaqs },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Everything you need to know"
        mediaLabel="The Club"
      />

      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Tabs defaultValue="starters" className="gap-10">
            <Reveal>
              <TabsList
                variant="line"
                className="-mx-5 h-auto w-auto flex-nowrap justify-start overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
              >
                {sections.map((s) => (
                  <TabsTrigger
                    key={s.value}
                    value={s.value}
                    className="h-auto flex-none whitespace-nowrap border-b border-border px-1 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground data-active:text-foreground"
                  >
                    {s.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Reveal>

            {sections.map((s) => (
              <TabsContent key={s.value} value={s.value}>
                <Reveal>
                  <div className="max-w-3xl">
                    <FaqAccordion faqs={s.faqs} />
                  </div>
                </Reveal>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
