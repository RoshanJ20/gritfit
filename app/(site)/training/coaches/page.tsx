import type { Metadata } from "next";

import { team } from "@/content/team";
import { coaches, leadership } from "@/content/coaches";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { CoachCard } from "@/components/sections/coach-card";

export const metadata: Metadata = {
  title: "Meet the Coaches — Training",
  description:
    "We build our team around three values: humility, consistency, and a commitment to continuous learning.",
};

export default function CoachesPage() {
  return (
    <>
      <PageHero
        eyebrow={team.eyebrow}
        title="Meet the coaches"
        lead={[team.values]}
        mediaLabel="The Team"
        mediaSrc="/images/training/coaching.jpg"
      />

      <section className="container-grit section">
        <Reveal>
          <p className="eyebrow">Leadership</p>
          <h2 className="display mt-4 text-display-2">The people behind Grit</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-[720px]">
          {leadership.map((person, i) => (
            <Reveal key={person.slug} delay={(i % 2) * 0.06}>
              <CoachCard coach={person} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-grit section border-t border-border">
        <Reveal>
          <p className="eyebrow">The coaches</p>
          <h2 className="display mt-4 text-display-2">Who you&apos;ll train with</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Hover or tap a coach to read their philosophy, areas of expertise,
            and coaching style.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach, i) => (
            <Reveal key={coach.slug} delay={(i % 3) * 0.06}>
              <CoachCard coach={coach} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Personal Training"
        heading="Coaching makes champions."
        body="After your assessment, we match you with a coach based on your goals, experience, and needs."
      />
    </>
  );
}
