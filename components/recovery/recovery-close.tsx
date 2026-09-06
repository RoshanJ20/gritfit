import Link from "next/link";
import type { ReactNode } from "react";

import { recovery } from "@/content/recovery";
import { Reveal } from "@/components/motion/reveal";

/**
 * The shared bottom of every Essential Recovery page — the "not a replacement
 * for training" note paired with the packages & pricing panel, then the booking
 * CTA. The
 * hub, Exposure Therapy, and Manual Therapy all end on this exact sequence so
 * the section reads the same wherever a member lands. `children` is an optional
 * slot beneath the CTA.
 */
export function RecoveryClose({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* Note + packages, stacked in one narrow column. Side by side they left
          a wide empty band on `lg`; stacked and capped at `max-w-3xl` they read
          as one closing statement without costing much height — the packages
          panel keeps its copy and its button on one row from `sm` up, so the
          stack stays short. The note is a hairline-marked statement (no box);
          the panel keeps its border and brand wash so the action has weight. */}
      <section className="border-t border-border">
        <div className="container-grit section-sm">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <Reveal>
              <div className="border-l-2 border-brand/70 pl-6 lg:pl-8">
                <p className="eyebrow">Note</p>
                <p className="mt-3 text-lg font-medium leading-snug text-foreground sm:text-xl">
                  {recovery.note}
                </p>
              </div>
            </Reveal>

            <div className="relative isolate overflow-hidden border border-border bg-ink-800/40 p-6 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(55% 120% at 100% 0%, color-mix(in srgb, var(--brand) 9%, transparent) 0%, transparent 70%)",
                }}
              />
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10">
                <div>
                  <Reveal>
                    <p className="eyebrow">{recovery.packages.eyebrow}</p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h2 className="display mt-3 max-w-[20ch] text-2xl sm:text-3xl">
                      {recovery.packages.heading}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {recovery.packages.body}
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.24} className="sm:shrink-0">
                  <Link href="/contact" className="btn btn-outline px-8 py-4">
                    {recovery.packages.cta}
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-grit section text-center">
        <Reveal>
          <p className="eyebrow justify-center">{recovery.cta.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 text-display-1 max-w-[16ch]">
            {recovery.cta.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            {recovery.cta.body}
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex justify-center">
          <Link href="/contact" className="btn btn-solid px-9 py-4">
            Book a Recovery Session
          </Link>
        </Reveal>
        {children}
      </section>
    </>
  );
}
