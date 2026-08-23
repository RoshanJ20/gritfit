"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCw } from "lucide-react";

import { cn } from "@/lib/utils";
import { hasBackContent, type Coach } from "@/content/coaches";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Placeholder } from "@/components/placeholder";

/**
 * Coach profile card. The front is the portrait — name, role, index numeral.
 * The back carries the rest of the sheet: identity statement, philosophy,
 * expertise, style, and why they coach.
 *
 * Flips on hover (hover-capable pointers only — Tailwind's `hover:` variant is
 * already gated behind `@media (hover: hover)`), on tap, and on keyboard focus.
 * A profile with no back-side content yet renders as a static card instead, so
 * leadership entries start flipping automatically the moment copy lands.
 *
 * A tap-flip is not sticky: it releases the moment the pointer leaves the card,
 * when a pointer goes down anywhere outside it, or on Escape. Without that, a
 * clicked card stayed face-up while you moved on to the next one and the grid
 * filled up with open backs.
 */
export function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const flippable = hasBackContent(coach);

  // Only listen while this card is actually held open.
  useEffect(() => {
    if (!flipped) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setFlipped(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFlipped(false);
    };

    // Capture phase so a press on a neighbouring card releases this one before
    // that card's own click handler runs.
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [flipped]);

  if (!flippable) {
    return (
      <article className="group relative aspect-[3/4] w-full">
        <CardFront coach={coach} index={index} />
      </article>
    );
  }

  return (
    <div
      ref={ref}
      // Leaving the card releases a tap-flip, so moving to the next card (or
      // to empty space) turns this one back over on its own.
      onMouseLeave={() => setFlipped(false)}
      className="group relative aspect-[3/4] w-full [perspective:1200px]"
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${coach.name}, ${coach.role} — show profile details`}
        className={cn(
          "absolute inset-0 block h-full w-full cursor-pointer rounded-md text-left",
          // `will-change` keeps the faces on their own layer, so the type stops
          // re-rasterising (and shimmering) partway through the turn.
          "[transform-style:preserve-3d] [will-change:transform]",
          // Symmetric in-out easing: a flip travels A→B, so it should ease out
          // of rest and back into it. The quint curve keeps the midpoint fast
          // while both ends settle, which is what reads as snappy rather than
          // abrupt.
          "transition-transform duration-[520ms] ease-in-out-quint",
          flipped
            ? "[transform:rotateY(180deg)_scale(1.02)]"
            : cn(
                "[transform:rotateY(0deg)_scale(1)]",
                // Hover-in waits a beat so sweeping the cursor across the grid
                // doesn't set every card spinning; leaving drops the delay, so
                // the card returns the instant you go.
                "group-hover:[transform:rotateY(180deg)_scale(1.02)] group-hover:[transition-delay:90ms]",
                "group-focus-within:[transform:rotateY(180deg)_scale(1.02)]",
              ),
        )}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <CardFront coach={coach} index={index} showFlipCue />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardBack coach={coach} />
        </div>
      </button>
    </div>
  );
}

function CardFront({
  coach,
  index,
  showFlipCue = false,
}: {
  coach: Coach;
  index: number;
  showFlipCue?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md">
      <MediaPlaceholder
        label={coach.name}
        ratio="auto"
        src={coach.image}
        imagePosition="50% 25%"
        className="h-full"
      />

      {/* legibility scrim under the name block */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent"
      />

      {/* brand hairline wipes in along the top edge, matching ProgramCards */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
      />

      <span className="absolute left-5 top-4 z-10 font-mono text-[0.7rem] tracking-[0.2em] text-brand/80">
        {String(index + 1).padStart(2, "0")}
      </span>

      {showFlipCue && (
        <span
          aria-hidden
          className="absolute right-4 top-4 z-10 flex size-7 items-center justify-center rounded-full border border-foreground/20 text-foreground/50 transition-colors duration-500 group-hover:border-brand/60 group-hover:text-brand"
        >
          <RotateCw className="size-3" />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-5">
        <h3 className="display text-2xl leading-none">{coach.name}</h3>
        <p className="text-[0.68rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
          {coach.role}
        </p>
      </div>
    </div>
  );
}

function CardBack({ coach }: { coach: Coach }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-md border border-brand/25 bg-ink-800">
      <span aria-hidden className="h-px w-full shrink-0 bg-brand" />

      <div className="flex shrink-0 flex-col gap-1 px-5 pb-3 pt-4">
        <h3 className="display text-lg leading-none">{coach.name}</h3>
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {coach.role}
        </p>
      </div>

      {/* Narrow viewports (and longer copy) overflow — scroll, but hide the
          native scrollbar chrome; the fade below signals there's more. */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Identity statement leads — the emotional hook, set in display type. */}
        <div className="border-t border-border pt-3">
          {coach.identity ? (
            <p className="text-sm leading-relaxed text-foreground">
              {coach.identity}
            </p>
          ) : (
            <Placeholder label="One-line identity statement" className="text-xs">
              Identity statement pending
            </Placeholder>
          )}
        </div>

        <Field label="Philosophy" value={coach.philosophy} />

        <div className="mt-4 border-t border-border pt-3">
          <p className="eyebrow mb-2 flex">Expertise</p>
          {coach.expertise.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {coach.expertise.map((item) => (
                <li
                  key={item}
                  className="rounded-sm border border-foreground/15 px-2 py-0.5 text-[0.68rem] leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder label="Areas of expertise" className="text-xs">
              Expertise pending
            </Placeholder>
          )}
        </div>

        <Field label="Style" value={coach.style} />
        <Field label="Why I Coach" value={coach.why} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-800 to-transparent"
      />
    </div>
  );
}

/** Labelled block on the card back. Empty source data renders as a placeholder. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 border-t border-border pt-3">
      {/* `flex` overrides .eyebrow's inline-flex so the label owns its line. */}
      <p className="eyebrow mb-2 flex">{label}</p>
      {value ? (
        <p className="text-[0.8rem] leading-relaxed text-muted-foreground">
          {value}
        </p>
      ) : (
        <Placeholder label={label} className="text-xs">
          {label} pending
        </Placeholder>
      )}
    </div>
  );
}
