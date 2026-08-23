"use client";

import { HeroVideo } from "@/components/hero-video";
import { site } from "@/content/site";

import { useCountdown, type TimeLeft } from "./use-countdown";

/**
 * The launch takeover.
 *
 * A sealed, full-viewport split: cinematic footage on one side, the live
 * counter on the other. Deliberately contains no links, no navigation and no
 * calls to action — for the 24 hours it is up, this page *is* the site.
 */
export function CountdownClient() {
  const { time, ready } = useCountdown();

  return (
    <div className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-ink-900 lg:flex-row">
      {/* ---------------------------------------------------------------- */}
      {/* Left — cinematic footage. Shorter band on mobile so the counter   */}
      {/* still lands above the fold on a small phone.                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative h-[38svh] w-full shrink-0 lg:h-full lg:w-[55%]">
        <HeroVideo />
        {/* Seam — fades footage into the counter panel, vertical on desktop. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900 to-transparent lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-32 lg:bg-gradient-to-l"
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Right — the counter panel.                                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative flex min-h-0 flex-1 flex-col justify-center px-6 py-8 sm:px-10 lg:w-[45%] lg:px-14">
        <p className="eyebrow">
          <span
            aria-hidden
            className={time.done ? "size-1.5 bg-brand" : "size-1.5 animate-pulse bg-brand"}
          />
          {time.done ? "Now open" : "Launching soon"}
        </p>

        <p
          className="mt-5 font-[family-name:var(--font-wordmark)] uppercase leading-none tracking-[0.01em] text-foreground"
          style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
        >
          {site.name}
        </p>

        <Counter time={time} ready={ready} />

        <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Nothing is given. Everything is earned. Strength, RUSH and Recovery
          under one roof.
        </p>

        <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {site.location.neighborhood} · {site.location.city}
        </p>
      </div>
    </div>
  );
}

/** The four digit groups, hairline-separated, with a depleting progress rule. */
function Counter({ time, ready }: { time: TimeLeft; ready: boolean }) {
  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <div
      className="mt-9"
      role="timer"
      aria-live="off"
      aria-label={
        time.done
          ? "Now open"
          : `${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds until launch`
      }
    >
      <div className="flex items-start">
        {units.map((unit, i) => (
          <div
            key={unit.label}
            className={
              i === 0
                ? "flex-1 pr-3 sm:pr-4"
                : "flex-1 border-l border-border pl-3 pr-3 sm:pl-4 sm:pr-4"
            }
          >
            <span
              // Re-keying on the value restarts the tick animation each change.
              key={ready ? unit.value : "pending"}
              className="count-tick block font-[family-name:var(--font-wordmark)] tabular-nums leading-none text-foreground"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)" }}
            >
              {ready ? String(unit.value).padStart(2, "0") : "––"}
            </span>
            <span className="mt-2.5 block text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Depleting hairline — fills toward launch. */}
      <div className="relative mt-7 h-px w-full bg-border">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 bg-brand transition-[width] duration-1000 ease-linear"
          style={{ width: `${Math.min(100, Math.max(0, time.progress * 100))}%` }}
        />
      </div>
    </div>
  );
}
