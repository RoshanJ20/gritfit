"use client";

import { useId, useState } from "react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { MediaPlaceholder } from "@/components/media-placeholder";

/** A single program presented as one expandable editorial row. */
export type ProgramRow = {
  name: string;
  href: string;
  /** Short teaser shown collapsed and emphasised when open. */
  lead: string;
  /** Fuller paragraph shown only when the row is open. */
  blurb?: string;
  /** Grayscale photo for the open panel. Omit for a text-led row (Nutrition). */
  image?: string;
  /** CTA label for the open panel. Defaults to "Explore program". */
  cta?: string;
};

/** A titled chapter of rows (e.g. Core Programs, Specialised Coaching). */
export type ProgramSection = {
  label: string;
  intro?: string;
  rows: ProgramRow[];
};

/**
 * Programs for the training page as an editorial accordion. Chapters stack
 * vertically; each program is a hairline-separated row that expands into a
 * two-column panel (copy + grayscale photo). One row is open at a time; the
 * first opens by default. Click / Enter toggles a row — hover only highlights,
 * so rows never shift under the cursor.
 */
export function TrainingPrograms({
  eyebrow = "Programs",
  sections,
}: {
  eyebrow?: string;
  sections: ProgramSection[];
}) {
  // Unique key per row = its href. Default-open the very first program.
  const [openKey, setOpenKey] = useState<string | null>(
    sections[0]?.rows[0]?.href ?? null,
  );

  return (
    <section className="border-t border-border">
      <div className="container-grit py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow mb-12 lg:mb-16">{eyebrow}</p>
        </Reveal>

        <div className="space-y-16 lg:space-y-24">
          {sections.map((section) => (
            <div
              key={section.label}
              className="grid gap-x-12 gap-y-6 lg:grid-cols-[0.32fr_1fr]"
            >
              {/* Chapter label — quiet, sits alongside the rows on desktop */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <h2 className="display text-xl text-foreground sm:text-2xl">
                    {section.label}
                  </h2>
                  {section.intro && (
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {section.intro}
                    </p>
                  )}
                </Reveal>
              </div>

              {/* Rows */}
              <ul className="border-t border-border">
                {section.rows.map((row, i) => (
                  <Reveal as="li" key={row.href} delay={i * 0.05}>
                    <ProgramAccordionRow
                      row={row}
                      index={i + 1}
                      open={openKey === row.href}
                      onToggle={() =>
                        setOpenKey((k) => (k === row.href ? null : row.href))
                      }
                    />
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramAccordionRow({
  row,
  index,
  open,
  onToggle,
}: {
  row: ProgramRow;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="group relative border-b border-border">
      {/* Brand edge — grows in while the row is open */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-px origin-top bg-brand transition-transform duration-500 ease-out ${
          open ? "scale-y-100" : "scale-y-0"
        }`}
      />

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-5 py-6 pl-4 pr-1 text-left transition-colors sm:gap-8 sm:py-7 lg:pl-8"
      >
        <span
          className={`display text-sm tabular-nums transition-colors duration-300 ${
            open ? "text-brand" : "text-muted-foreground group-hover:text-foreground"
          }`}
        >
          {String(index).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`display block text-2xl transition-colors duration-300 sm:text-3xl lg:text-4xl ${
              open ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
            }`}
          >
            {row.name}
          </span>
          {/* Teaser — hidden once open (the panel shows it in full) */}
          <span
            className={`mt-2 hidden max-w-md truncate text-sm text-muted-foreground lg:block ${
              open ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
          >
            {row.lead}
          </span>
        </span>

        {/* Arrow — points right when closed, rotates down when open */}
        <span
          aria-hidden
          className={`shrink-0 text-lg transition-all duration-500 ease-out ${
            open
              ? "rotate-90 text-brand"
              : "text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground"
          }`}
        >
          →
        </span>
      </button>

      {/* Expanding panel — animates height via grid-template-rows 0fr → 1fr */}
      <div
        id={panelId}
        role="region"
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`grid items-center gap-8 pb-10 pl-4 pr-1 pt-1 transition-opacity duration-500 lg:grid-cols-2 lg:gap-12 lg:pl-8 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Copy */}
            <div className="max-w-lg">
              <p className="text-lg leading-relaxed text-foreground">{row.lead}</p>
              {row.blurb && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {row.blurb}
                </p>
              )}
              <Link
                href={row.href}
                tabIndex={open ? undefined : -1}
                className="group/cta mt-7 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:text-brand"
              >
                {row.cta ?? "Explore program"}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>

            {/* Photo — text-led rows (no image) simply omit this column */}
            {row.image && (
              <MediaPlaceholder
                src={row.image}
                label={row.name}
                ratio="video"
                className="rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
