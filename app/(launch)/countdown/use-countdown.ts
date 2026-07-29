"use client";

import { useEffect, useState } from "react";

/**
 * The launch moment, as an absolute ISO-8601 timestamp with an explicit offset.
 *
 * Set this when the date is fixed, e.g.:
 *
 *     export const LAUNCH_AT: string | null = "2026-08-15T18:00:00+05:30";
 *
 * Always include the offset (`+05:30` for IST). Without it the string is read
 * in the *visitor's* timezone, so someone in London would see a different
 * countdown from someone in Bengaluru.
 *
 * Left `null`, the page runs in demo mode: the clock starts a full window from
 * page load, so it always reads live for a walkthrough.
 */
export const LAUNCH_AT: string | null = null;

/** How long the countdown runs. The brief is a 24-hour window. */
export const WINDOW_MS = 24 * 60 * 60 * 1000;

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Milliseconds remaining, clamped at 0. */
  remaining: number;
  /** 0 at the start of the window, 1 at launch. */
  progress: number;
  /** True once the countdown has hit zero. */
  done: boolean;
};

/** The pre-hydration placeholder. Rendered identically on server and client. */
export const PENDING: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  remaining: WINDOW_MS,
  progress: 0,
  done: false,
};

function split(remaining: number, windowMs: number): TimeLeft {
  const clamped = Math.max(0, remaining);
  const totalSeconds = Math.floor(clamped / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
    remaining: clamped,
    progress: windowMs > 0 ? 1 - clamped / windowMs : 1,
    done: clamped <= 0,
  };
}

/**
 * Ticks once a second toward `LAUNCH_AT`.
 *
 * The site is a static export (`output: "export"`), so the server has no idea
 * what time it is for the visitor. The hook therefore returns `PENDING` on the
 * very first render — matching the prerendered HTML exactly — and only starts
 * reading the real clock after mount. That is what keeps hydration clean; a
 * `Date.now()` call during render would mismatch on every single load.
 */
export function useCountdown(): { time: TimeLeft; ready: boolean } {
  const [time, setTime] = useState<TimeLeft>(PENDING);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Demo mode anchors the window to first paint; a real LAUNCH_AT is absolute.
    const target = LAUNCH_AT
      ? new Date(LAUNCH_AT).getTime()
      : Date.now() + WINDOW_MS;

    // A fixed launch date may be further out than the 24h window; the depleting
    // hairline should only start filling once we are inside it.
    const windowMs = LAUNCH_AT
      ? Math.min(WINDOW_MS, Math.max(1, target - Date.now()))
      : WINDOW_MS;

    const tick = () => setTime(split(target - Date.now(), windowMs));

    tick();
    setReady(true);

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return { time, ready };
}
