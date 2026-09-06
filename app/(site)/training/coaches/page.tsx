import type { Metadata } from "next";

import { team } from "@/content/team";
import { coaches, leadership } from "@/content/coaches";
import { PageHero } from "@/components/sections/page-hero";
import { TrainingCta } from "@/components/sections/training-cta";
import { Reveal } from "@/components/motion/reveal";
import { CoachCard } from "@/components/sections/coach-card";

export const metadata: Metadata = {
  title: "Meet the Coaches — Training",
  description:
    "We build our team around three values: humility, consistency and a commitment to continuous learning.",
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

      {/* Coaches lead the page — they are who a member actually trains with.
          Leadership follows beneath. */}
      <section className="container-grit section">
        <Reveal>
          <p className="eyebrow">The coaches</p>
          <h2 className="display mt-4 text-display-2">Who you&apos;ll train with</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Hover a coach to preview their philosophy, areas of expertise and
            coaching style. Click or tap to keep a card open — hold several
            open at once to compare, and click again to close.
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

      <section className="container-grit section border-t border-border">
        <Reveal>
          <p className="eyebrow">Leadership</p>
          <h2 className="display mt-4 text-display-2">The people behind Grit Fit</h2>
        </Reveal>

        {/* Same column rhythm as the coaches grid above, so all three sit on
            one row and their edges line up with the cards further up. */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person, i) => (
            <Reveal key={person.slug} delay={(i % 2) * 0.06}>
              <CoachCard coach={person} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <TrainingCta />
    </>
  );
}
