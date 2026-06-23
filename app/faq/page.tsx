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
        mediaSrc="/images/club-interior.jpg"
      />

      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Tabs defaultValue="starters" className="gap-10">
            <Reveal>
              <TabsList
                variant="line"
                className="relative -mx-5 flex h-auto w-full min-w-0 max-w-[calc(100%+2.5rem)] flex-nowrap justify-start gap-x-8 gap-y-0 overflow-x-auto border-b border-border px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:max-w-full sm:flex-wrap sm:gap-y-3 sm:px-0"
              >
                {sections.map((s) => (
                  <TabsTrigger
                    key={s.value}
                    value={s.value}
                    className="relative h-auto flex-none whitespace-nowrap rounded-none border-0 px-0 pb-4 pt-0 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-active:text-foreground after:h-[2px] after:bg-brand group-data-horizontal/tabs:after:-bottom-px"
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
