import type { ReactNode } from "react";

import { recovery } from "@/content/recovery";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

// Same WhatsApp join link as the navbar "Join Club" CTA.
const joinHref = whatsappUrl(site.whatsapp.joinMessage);

/**
 * The shared bottom of every Essential Recovery page — one card that says what
 * recovery is for and where the pricing lives, then the booking CTA. The
 * hub, Exposure Therapy, and Massage Therapy all end on this exact sequence so
 * the section reads the same wherever a member lands. `children` is an optional
 * slot beneath the CTA.
 */
export function RecoveryClose({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* Closing notes — two side-by-side points (pricing, and what recovery
          is for) rather than one wide banner: a brand tick, a green heading and
          quiet body each, stacking to one column below `sm`. */}
      <section className="border-t border-border">
        <div className="container-grit section-sm">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {recovery.packages.map((note, i) => (
              <Reveal key={note.label} delay={i * 0.08}>
                <div className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.45rem] size-1.5 shrink-0 bg-brand"
                  />
                  <div>
                    <p className="eyebrow">{note.label}</p>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {note.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
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
          <a
            href={joinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid px-9 py-4"
          >
            Book a Recovery Session
          </a>
        </Reveal>
        {children}
      </section>
    </>
  );
}
