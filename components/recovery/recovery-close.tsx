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
      {/* Note + packages share one section, side by side on `lg`. They used to
          stack as two full-width bands, which cost a lot of height for two
          short blocks; paired in one row they read as a single closing
          statement and the page tightens up. The note stays a hairline-marked
          statement (no box); the packages half keeps its bordered panel and
          brand wash so the action still has weight. Below `lg` they stack in
          the same order as before. */}
      <section className="border-t border-border">
        <div className="container-grit section-sm grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="border-l-2 border-brand/70 pl-6 lg:pl-8">
              <p className="eyebrow">Note</p>
              <p className="mt-4 text-lg font-medium leading-snug text-foreground sm:text-xl">
                {recovery.note}
              </p>
            </div>
          </Reveal>

          <div className="relative isolate overflow-hidden border border-border bg-ink-800/40 p-8 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(55% 120% at 100% 0%, color-mix(in srgb, var(--brand) 9%, transparent) 0%, transparent 70%)",
              }}
            />
            <Reveal>
              <p className="eyebrow">{recovery.packages.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-4 text-3xl max-w-[16ch] sm:text-4xl">
                {recovery.packages.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {recovery.packages.body}
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-7">
              <Link href="/contact" className="btn btn-outline px-8 py-4">
                {recovery.packages.cta}
              </Link>
            </Reveal>
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
