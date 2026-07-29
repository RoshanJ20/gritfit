import type { Metadata } from "next";

import { sessionPacks, sessionsNote } from "@/content/recovery-sessions";
import { SessionPackCard } from "@/components/membership/session-pack-card";
import { CtaBand } from "@/components/sections/cta-band";
import { Callout } from "@/components/sections/callout";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Recovery Sessions — Session-based plans",
  description:
    "Recover on your terms with session-based plans for the Recovery Zone. Choose 1, 4, 8, or 12 sessions — no long-term commitment.",
};

export default function RecoverySessionsPage() {
  // Largest pack sets the scale the per-plan meters fill against.
  const maxSessions = Math.max(...sessionPacks.map((p) => p.sessions));

  return (
    <>
      {/* Compact header — no media, so the plans sit in the first viewport */}
      <section className="bg-spotlight border-b border-border pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="container-grit">
          <Reveal playOnMount>
            <p className="eyebrow">Recovery Sessions</p>
          </Reveal>
          <Reveal playOnMount delay={0.08}>
            <h1 className="display mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] pb-[0.08em]">
              Recover on your <span className="font-light italic">terms.</span>
            </h1>
          </Reveal>
          <Reveal playOnMount delay={0.16}>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Session-based plans for the Recovery Zone — no long-term
              commitment. Choose the pack that fits how you train.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Session packs */}
      <section className="container-grit section-sm">
        <div className="group relative grid sm:grid-cols-2 lg:grid-cols-4">
          {sessionPacks.map((pack, i) => (
            <Reveal key={pack.sessions} delay={i * 0.08} className="h-full">
              <SessionPackCard pack={pack} maxSessions={maxSessions} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Callout label="Please note">{sessionsNote}</Callout>
        </div>
      </section>

      <CtaBand
        eyebrow="The Recovery Zone"
        heading="Recovery is training."
        body="Arrive 10 minutes early. Our team will guide you through the process and recommended exposure times."
      />
    </>
  );
}
