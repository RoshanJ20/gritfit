import type { Metadata } from "next";

import { membershipNotes } from "@/content/membership";
import { site } from "@/content/site";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { MembershipPlans } from "@/components/membership/membership-plans";

export const metadata: Metadata = {
  title: "Membership — Choose your commitment",
  description:
    "Three ways to train at Grit Fit: Core, Platinum and VIP — from a single training path to unlimited Classes, Strength Club and Essential Recovery.",
};

export default function MembershipPage() {
  return (
    <>
      {/* Compact header — no media, so the plans sit in the first viewport */}
      <section className="bg-spotlight border-b border-border pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="container-grit">
          <Reveal playOnMount>
            <p className="eyebrow">Membership</p>
          </Reveal>
          <Reveal playOnMount delay={0.08}>
            <h1 className="display mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] pb-[0.08em]">
              Choose your <span className="font-light italic">commitment.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Plans */}
      <section className="container-grit section-sm">
        <MembershipPlans />

        {/* Practical notes. Deliberately quieter than the plan cards above:
            a hairline rule and two side-by-side points rather than one wide
            brand-tinted banner, which read as an alert and sat oddly under the
            grid. Each point leads with a brand tick so it still scans as
            structured info. Stacks to one column below `sm`. */}
        <div className="mt-12 border-t border-border pt-8 sm:mt-14">
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {membershipNotes.map((note, i) => (
              <Reveal key={note.label} delay={i * 0.08}>
                <div className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.45rem] size-1.5 shrink-0 bg-brand"
                  />
                  <div>
                    <p className="eyebrow">{note.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {note.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <a
              href={`tel:${site.contact.phone.value.replace(/\s/g, "")}`}
              className="group mt-6 inline-flex items-center gap-2 text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              Call {site.contact.name} — {site.contact.phone.value}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
