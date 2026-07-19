import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/reactbits/count-up";

/** A single program revealed inside a category card. */
export type ProgramLink = {
  name: string;
  href: string;
  /** Optional one-line teaser shown under the program name. */
  note?: string;
  /** Grayscale thumbnail. Omit for the branded mini surface (Nutrition). */
  image?: string;
};

/** A broad program category presented as one lift-to-reveal card. */
export type ProgramCategory = {
  name: string;
  /** One-line intro shown at rest. */
  intro?: string;
  /** Grayscale background photo. Omit for the branded surface (Nutrition). */
  image?: string;
  /** The individual programs revealed on hover/focus. */
  programs: ProgramLink[];
};

/**
 * Programs for the training page as three broad category cards on one row. At
 * rest each card shows its photo, number, name and intro. On hover / focus the
 * card's lower area lifts open to reveal the individual programs as media
 * cards. Pure CSS (group-hover + group-focus-within); on touch / small screens
 * the programs simply show.
 */
export function TrainingPrograms({
  eyebrow = "Programs",
  categories,
}: {
  eyebrow?: string;
  categories: ProgramCategory[];
}) {
  return (
    <section className="border-t border-border">
      <div className="container-grit py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow mb-12 lg:mb-16">{eyebrow}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.name} delay={i * 0.08}>
              <CategoryCard category={category} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: ProgramCategory;
  index: number;
}) {
  return (
    <div className="group relative isolate flex h-full min-h-[560px] flex-col justify-end overflow-hidden rounded-md border border-border bg-ink-900 transition-colors duration-500 hover:border-brand/60 focus-within:border-brand/60 lg:min-h-[680px]">
      {/* Background — photo (grayscale, zooms on hover) or branded surface */}
      <div className="absolute inset-0 -z-10">
        {category.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={category.image}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover grayscale contrast-110 brightness-105 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] group-focus-within:scale-[1.06]"
          />
        ) : (
          <div
            className="h-full w-full bg-ink-800"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, color-mix(in srgb, var(--brand) 20%, transparent) 0 1px, transparent 1px 16px)",
            }}
            aria-hidden
          />
        )}
        {/* Darkening gradient — deepens on hover so the list stays legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/25 transition-all duration-500 group-hover:from-ink-900 group-hover:via-ink-900/85 group-focus-within:from-ink-900 group-focus-within:via-ink-900/85" />
        {/* Top scrim — seats the number on brighter photos */}
        <div
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink-900/70 to-transparent"
          aria-hidden
        />
      </div>

      {/* Brand top-line — sweeps in on hover / focus */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
      />

      {/* Bottom content — number + title + intro at rest; program list lifts in */}
      <div className="relative p-7 lg:p-8">
        <span className="display block text-sm tabular-nums text-brand">
          <CountUp to={index} pad={2} />
        </span>
        <h3 className="display mt-3 text-3xl text-foreground sm:text-4xl">
          {category.name}
        </h3>
        {category.intro && (
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {category.intro}
          </p>
        )}

        {/* Program cards — collapsed on desktop, lift open on hover / focus.
            Always open on touch / small screens (no hover to rely on). */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <ul className="mt-6 space-y-3 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
              {category.programs.map((program) => (
                <li key={program.href}>
                  <ProgramSubCard program={program} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/** One program shown as a compact media card inside an open category. */
function ProgramSubCard({ program }: { program: ProgramLink }) {
  return (
    <Link
      href={program.href}
      className="group/item flex items-center gap-4 rounded-md border border-white/10 bg-ink-800/70 p-3 backdrop-blur-sm transition-all duration-300 hover:border-brand/50 hover:bg-ink-800"
    >
      {/* Thumbnail — grayscale photo, or a branded mini surface when absent */}
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded sm:h-[72px] sm:w-[72px]">
        {program.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={program.image}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover grayscale contrast-110 brightness-105 transition-transform duration-500 ease-out group-hover/item:scale-110"
          />
        ) : (
          <span
            className="block h-full w-full bg-ink-900"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, color-mix(in srgb, var(--brand) 22%, transparent) 0 1px, transparent 1px 8px)",
            }}
            aria-hidden
          />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-base font-medium text-foreground transition-colors group-hover/item:text-brand sm:text-lg">
          {program.name}
        </span>
        {program.note && (
          <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {program.note}
          </span>
        )}
      </span>

      <span
        aria-hidden
        className="shrink-0 text-brand transition-transform duration-300 ease-out group-hover/item:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
