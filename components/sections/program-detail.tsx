import { programs, type Program } from "@/content/programs";
import { PageHero } from "@/components/sections/page-hero";
import { LinkList } from "@/components/sections/link-list";
import { CtaBand } from "@/components/sections/cta-band";
import { ScrollReveal } from "@/components/reactbits/scroll-reveal";

/**
 * Shared layout for a single training program: hero, the program statement, and
 * a cross-link list of the other programs.
 */
export function ProgramDetail({ program }: { program: Program }) {
  const others = programs
    .filter((p) => p.slug !== program.slug)
    .map((p) => ({ name: p.name, href: p.href, note: p.lead }));

  return (
    <>
      <PageHero
        eyebrow={program.group === "core" ? "Training · Programs" : "Training · Specialised"}
        title={program.name}
        lead={[program.lead]}
        mediaLabel={program.name}
      />

      <section className="container-grit py-24 lg:py-36">
        <div className="mx-auto max-w-3xl space-y-6">
          {program.paras.map((p, i) => (
            <p
              key={i}
              className="text-balance text-xl font-light leading-[1.6] text-foreground"
            >
              <ScrollReveal>{p}</ScrollReveal>
            </p>
          ))}
        </div>
      </section>

      <LinkList eyebrow="More programs" items={others} />
      <CtaBand />
    </>
  );
}
