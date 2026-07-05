"use client";

import { useState } from "react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/reactbits/count-up";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

export type ProgramItem = { name: string; href: string; note?: string };

const CARD_BASIS =
  "basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[340px] lg:grow-0";

/**
 * Programs grid for the training page. The two core programs and a
 * "Specialised Coaching" card sit in a row. Hovering (or focusing/tapping) the
 * specialised card seamlessly reveals a second row of cards — one per
 * specialised program — each linking to its own page.
 */
export function TrainingPrograms({
  eyebrow = "Programs",
  core,
  specialised,
  specialisedNote,
}: {
  eyebrow?: string;
  core: ProgramItem[];
  specialised: ProgramItem[];
  specialisedNote?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-t border-border">
      <div className="container-grit py-16 lg:py-20">
        <Reveal>
          <p className="eyebrow mb-10 text-center">{eyebrow}</p>
        </Reveal>

        {/* Leaving the whole block closes the reveal; moving between the
            trigger card and the revealed row keeps it open. */}
        <div onMouseLeave={() => setOpen(false)}>
          <div className="flex flex-wrap justify-center gap-6">
            {core.map((item, i) => (
              <Reveal
                key={item.href}
                delay={i * 0.06}
                className={CARD_BASIS}
              >
                <ProgramCard item={item} number={i + 1} />
              </Reveal>
            ))}

            {/* Specialised Coaching — hover/focus trigger */}
            <Reveal delay={0.12} className={CARD_BASIS}>
              <button
                type="button"
                aria-expanded={open}
                onMouseEnter={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onClick={() => setOpen((v) => !v)}
                className="group relative isolate flex h-full w-full flex-col items-center gap-4 overflow-hidden rounded-md border border-border bg-ink-900 p-8 text-center transition-colors hover:border-brand/40 hover:bg-ink-800 aria-expanded:border-brand/40 lg:p-10"
              >
                <SpotlightOverlay className="-z-10" />
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 group-aria-expanded:scale-x-100"
                />
                <span className="display text-xl text-brand">
                  <CountUp to={core.length + 1} pad={2} />
                </span>
                <h3 className="display text-2xl sm:text-3xl">Specialised Coaching</h3>
                {specialisedNote && (
                  <p className="max-w-xs text-balance text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                    {specialisedNote}
                  </p>
                )}
                <span
                  aria-hidden
                  className="mt-1 text-brand transition-transform duration-500 ease-out group-aria-expanded:rotate-90"
                >
                  →
                </span>
              </button>
            </Reveal>
          </div>

          {/* Revealed row — animates open via grid-template-rows 0fr → 1fr */}
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div
                aria-hidden={!open}
                onMouseEnter={() => setOpen(true)}
                className={`flex flex-wrap justify-center gap-6 pt-6 transition-opacity duration-500 ${
                  open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {specialised.map((item) => (
                  <div key={item.href} className={CARD_BASIS}>
                    <ProgramCard item={item} tabbable={open} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  item,
  number,
  tabbable = true,
}: {
  item: ProgramItem;
  number?: number;
  tabbable?: boolean;
}) {
  return (
    <Link
      href={item.href}
      tabIndex={tabbable ? undefined : -1}
      className="group relative isolate flex h-full flex-col items-center gap-4 overflow-hidden rounded-md border border-border bg-ink-900 p-8 text-center transition-colors hover:border-brand/40 hover:bg-ink-800 lg:p-10"
    >
      <SpotlightOverlay className="-z-10" />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      {number && (
        <span className="display text-xl text-brand">
          <CountUp to={number} pad={2} />
        </span>
      )}
      <h3 className="display text-2xl sm:text-3xl">{item.name}</h3>
      {item.note && (
        <p className="max-w-xs text-balance text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
          {item.note}
        </p>
      )}
      <span
        aria-hidden
        className="mt-1 text-brand transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
