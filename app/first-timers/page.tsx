import type { Metadata } from "next";

import { firstTimers } from "@/content/first-timers";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { ScrollReveal } from "@/components/reactbits/scroll-reveal";

export const metadata: Metadata = {
  title: "First Timers — Your first step starts here",
  description:
    "Everyone starts somewhere. Whether you’re stepping into a Rush class, training on the Strength Club floor, or experiencing The Recovery Zone for the first time, every journey starts the same way: show up.",
};

export default function FirstTimersPage() {
  return (
    <>
      <PageHero
        eyebrow={firstTimers.eyebrow}
        title={firstTimers.heading}
        lead={firstTimers.lead}
        mediaLabel="First Timers"
        mediaSrc="/images/first-timers.jpg"
      />

      {/* Opening statement */}
      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-3xl space-y-6">
          {firstTimers.intro.map((line, i) => (
            <p
              key={i}
              className="text-balance text-2xl font-light leading-[1.5] text-foreground sm:text-3xl"
            >
              <ScrollReveal>{line}</ScrollReveal>
            </p>
          ))}
        </div>
      </section>

      {/* Before your first visit — numbered 2-step grid */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">{firstTimers.beforeVisit.eyebrow}</p>
            <h2 className="display mt-4 text-display-2">
              Two steps before you start.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {firstTimers.beforeVisit.steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 bg-ink-900 p-8 lg:p-10">
                  <span className="display text-3xl text-brand">{s.step}</span>
                  <h3 className="display text-2xl">{s.title}</h3>
                  <div className="space-y-3">
                    {s.body.map((line, j) => (
                      <p
                        key={j}
                        className="leading-relaxed text-muted-foreground"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  {s.list && (
                    <ul className="mt-1 flex flex-col">
                      {s.list.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-4 border-b border-border py-3 text-foreground last:border-b-0"
                        >
                          <span
                            className="size-1.5 shrink-0 bg-brand"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.close?.map((line, j) => (
                    <p
                      key={j}
                      className="mt-1 leading-relaxed text-muted-foreground"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Your first … session — alternating editorial blocks */}
      <section className="border-t border-border">
        <div className="container-grit divide-y divide-border">
          {firstTimers.firstSessions.map((block) => (
            <div
              key={block.eyebrow}
              className="grid gap-8 py-20 lg:grid-cols-[0.5fr_1fr] lg:gap-16 lg:py-28"
            >
              <Reveal>
                <p className="eyebrow">{block.eyebrow}</p>
              </Reveal>
              <div className="max-w-2xl space-y-4">
                {block.lines.map((line, j) => (
                  <Reveal key={j} delay={j * 0.05}>
                    <p className="leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  </Reveal>
                ))}

                {block.list && (
                  <ul className="mt-2 flex flex-col">
                    {block.list.map((item, j) => (
                      <Reveal key={j} delay={j * 0.04} as="li">
                        <span className="flex items-center gap-4 border-b border-border py-3.5 text-foreground last:border-b-0">
                          <span
                            className="size-1.5 shrink-0 bg-brand"
                            aria-hidden
                          />
                          {item}
                        </span>
                      </Reveal>
                    ))}
                  </ul>
                )}

                {block.close?.map((line, j) => (
                  <Reveal key={`c-${j}`} delay={j * 0.05}>
                    <p className="leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to bring + Club etiquette — two-column lists */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {/* What to bring */}
            <div className="bg-ink-900 p-8 lg:p-10">
              <Reveal>
                <p className="eyebrow">{firstTimers.whatToBring.eyebrow}</p>
              </Reveal>
              <ul className="mt-6 flex flex-col">
                {firstTimers.whatToBring.items.map((item, i) => (
                  <Reveal key={i} delay={i * 0.04} as="li">
                    <span className="flex items-start gap-4 border-b border-border py-3.5 text-foreground last:border-b-0">
                      <span
                        className="mt-2 size-1.5 shrink-0 bg-brand"
                        aria-hidden
                      />
                      {item}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.1}>
                <p className="mt-6 text-muted-foreground">
                  {firstTimers.whatToBring.close}
                </p>
              </Reveal>
            </div>

            {/* Club etiquette */}
            <div className="bg-ink-900 p-8 lg:p-10">
              <Reveal>
                <p className="eyebrow">{firstTimers.clubEtiquette.eyebrow}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {firstTimers.clubEtiquette.intro}
                </p>
              </Reveal>
              <ul className="mt-6 flex flex-col">
                {firstTimers.clubEtiquette.items.map((item, i) => (
                  <Reveal key={i} delay={i * 0.04} as="li">
                    <span className="flex items-center gap-4 border-b border-border py-3.5 text-foreground last:border-b-0">
                      <span
                        className="size-1.5 shrink-0 bg-brand"
                        aria-hidden
                      />
                      {item}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.1}>
                <p className="mt-6 text-muted-foreground">
                  {firstTimers.clubEtiquette.close}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next — closing statement */}
      <section className="border-t border-border">
        <div className="container-grit py-24 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="eyebrow">{firstTimers.whatHappensNext.eyebrow}</p>
            </Reveal>
            <div className="mt-8 space-y-4">
              {firstTimers.whatHappensNext.lines.map((line, i) => (
                <p
                  key={i}
                  className="text-balance text-xl font-light leading-[1.5] text-foreground sm:text-2xl"
                >
                  <ScrollReveal>{line}</ScrollReveal>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="What happens next?"
        heading="Show up. Trust the process. Do the work."
        body="One session won’t change your life. Consistency will."
      />
    </>
  );
}
