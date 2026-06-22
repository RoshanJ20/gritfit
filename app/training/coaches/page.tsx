import type { Metadata } from "next";

import { team } from "@/content/team";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Placeholder } from "@/components/placeholder";

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
      />

      <section className="container-grit py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow">The coaches</p>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Individual coach profiles are being finalised. Each will include a
            name, title, and personal statement.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: team.placeholderCount }).map((_, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <div className="group flex flex-col gap-4">
                <MediaPlaceholder label="Coach" ratio="portrait" interactive />
                <div className="flex flex-col gap-2">
                  <Placeholder label="Name">Coach name</Placeholder>
                  <Placeholder label="Title">Title / discipline</Placeholder>
                </div>
              </div>
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
