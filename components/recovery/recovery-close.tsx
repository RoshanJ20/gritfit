import Link from "next/link";
import type { ReactNode } from "react";

import { recovery } from "@/content/recovery";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";

/**
 * The shared bottom of every Essential Recovery page — the "not a replacement
 * for training" note, the packages & pricing band, then the booking CTA. The
 * hub, Exposure Therapy, and Manual Therapy all end on this exact sequence so
 * the section reads the same wherever a member lands. `children` is an optional
 * slot beneath the CTA.
 */
export function RecoveryClose({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* Note and the packages panel below are the same object at two
          different weights, so they share a footprint: both span the full
          container and carry the same padding. The body copy keeps its own
          measure so the wider box doesn't stretch the lines. */}
      <section className="border-t border-border">
        <div className="container-grit section-sm">
          <Callout label="Note" bodyClassName="max-w-3xl">
            {recovery.note}
          </Callout>
        </div>
      </section>

      {/* Packages & pricing. A bordered panel inside the container so its edges
          line up with the rest of the page rather than bleeding to the viewport.
          Heading left, action right — the asymmetry keeps it from looking like a
          second copy of the centred CTA below. Brand appears only as the eyebrow
          and a soft wash; the old version wrapped the headline in the dashed
          `Placeholder` chip, which is why it read as loud and unfinished. */}
      <section className="container-grit section-sm">
        <div className="relative isolate overflow-hidden border border-border bg-ink-800/40 p-8 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(55% 120% at 100% 50%, color-mix(in srgb, var(--brand) 9%, transparent) 0%, transparent 70%)",
            }}
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">{recovery.packages.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="display mt-4 text-display-2 max-w-[16ch]">
                  {recovery.packages.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                  {recovery.packages.body}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.24} className="lg:pb-1">
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
