import Link from "next/link";
import type { ReactNode } from "react";

import { recovery } from "@/content/recovery";
import { Reveal } from "@/components/motion/reveal";

/**
 * The shared bottom of every Essential Recovery page — one card that says what
 * recovery is for and where the pricing lives, then the booking CTA. The
 * hub, Exposure Therapy, and Manual Therapy all end on this exact sequence so
 * the section reads the same wherever a member lands. `children` is an optional
 * slot beneath the CTA.
 */
export function RecoveryClose({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* One closing panel: what recovery is for and what it costs are the
          same statement, so there is no note block and no divider — heading,
          copy, and the enquiry button share a single row from `md` up. */}
      <section className="border-t border-border">
        <div className="container-grit section-sm">
          <div className="relative isolate mx-auto max-w-5xl overflow-hidden border border-border bg-ink-800/40 p-6 sm:p-8 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(55% 120% at 100% 0%, color-mix(in srgb, var(--brand) 9%, transparent) 0%, transparent 70%)",
              }}
            />

            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12">
              <div>
                <Reveal>
                  <p className="eyebrow">{recovery.packages.eyebrow}</p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="display mt-4 max-w-[26ch] text-2xl sm:text-3xl">
                    {recovery.packages.heading}
                  </h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                    {recovery.packages.body}
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.24} className="md:shrink-0">
                <Link href="/contact" className="btn btn-outline px-8 py-4">
                  {recovery.packages.cta}
                </Link>
              </Reveal>
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
