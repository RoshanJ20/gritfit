"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Pure CSS animation — pauses automatically under
 * reduced motion.
 *
 * Each copy of the track slides `-100% - gap` of ITS OWN width, so copy n+1
 * lands exactly where copy n started and the loop is seamless. The catch is
 * coverage: at the end of a cycle the whole strip has shifted left by one track
 * width, so with `copies` tracks the right-most content sits at
 * `(copies - 1) × trackWidth`. With only two copies that is a single track
 * width — the moment the content is narrower than the viewport, the tail of the
 * band empties out until the loop restarts.
 *
 * Four copies is the default because it covers any viewport up to roughly three
 * times the natural width of the children, which comfortably clears an ultrawide
 * monitor for a short word list. Extra copies are cheap (they are inert, static
 * markup) and invisible when the content is already wide enough, so this errs
 * on the side of never showing a hole.
 */
export function Marquee({
  children,
  className,
  durationSeconds = 30,
  reverse = false,
  gap = "2rem",
  copies = 4,
}: {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
  gap?: string;
  /** Number of times the track is repeated. Raise it for very short content. */
  copies?: number;
}) {
  /*
   * Hold the animation until the webfonts are in.
   *
   * The site loads its faces with `display: "swap"` (see app/fonts.ts), so the
   * first paint uses the fallback and the real face swaps in a moment later.
   * Swapping re-renders every glyph in the track — and re-rendering a box that
   * is mid-transform leaves a ghost of the previous raster offset by however
   * far the animation has travelled, which reads as doubled, smeared letters
   * for a frame or two. Starting the animation only once `document.fonts` has
   * settled means there is no transform in flight when the glyphs change.
   *
   * It also guarantees phase lock: all the tracks pick up the class in the same
   * React commit, so their animations share a start time and can never drift
   * apart from each other.
   */
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) setReady(true);
    };

    // Typed as optional deliberately — the DOM lib assumes the Font Loading
    // API is always present, which is not true of every browser we serve.
    const fonts = document.fonts as FontFaceSet | undefined;
    fonts?.ready.then(start);
    // Doubles as the path for browsers with no Font Loading API (fires next
    // tick) and as a safety net if `ready` somehow never settles.
    const timer = window.setTimeout(start, fonts ? 2000 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  /*
   * Couple the drift to scroll velocity.
   *
   * The band used to run at a fixed duration regardless of what the visitor
   * was doing, which made it decoration. Now scrolling adds energy to it and
   * scrolling up pushes it the other way, so it is the one element on the page
   * that answers the reader. Hovering holds it still.
   *
   * This is deliberately the cheap kind of scroll work: the listener only
   * accumulates a delta, and the single rAF loop writes one composited
   * `translate3d` per track. Nothing is measured or filtered per frame, which
   * is what separates it from the parallax that had to be removed.
   */
  useEffect(() => {
    if (!ready || reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const tracks = Array.from(
      root.querySelectorAll<HTMLElement>("[data-marquee-track]"),
    );
    if (tracks.length < 2) return;

    const direction = reverse ? -1 : 1;
    // Distance from one track to the next — its width plus the gap. Taken from
    // the layout rather than parsed out of the `gap` prop, so any unit works.
    let span = tracks[1].offsetLeft - tracks[0].offsetLeft;
    let offset = 0;
    let velocity = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let paused = false;
    let frame = 0;

    const measure = () => {
      span = tracks[1].offsetLeft - tracks[0].offsetLeft;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);

    const onScroll = () => {
      const y = window.scrollY;
      velocity += y - lastY;
      lastY = y;
    };
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);

    const tick = (now: number) => {
      // Clamped so a backgrounded tab does not resume with one enormous step.
      const delta = Math.min(64, now - lastTime);
      lastTime = now;

      // Frame-rate independent decay: velocity halves roughly every 7 frames
      // at 60Hz, and identically on a 120Hz display.
      velocity *= Math.pow(0.9, delta / 16.67);
      if (Math.abs(velocity) < 0.05) velocity = 0;

      if (span > 0) {
        const base = paused ? 0 : (span / durationSeconds) * direction;
        const speed = Math.max(
          -span * 1.6,
          Math.min(span * 1.6, base + velocity * 14),
        );
        // Normalised into [0, span) so the strip never uncovers its left edge.
        offset = (((offset + (speed * delta) / 1000) % span) + span) % span;
        for (const track of tracks) {
          track.style.transform = `translate3d(${-offset}px,0,0)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      for (const track of tracks) track.style.transform = "";
    };
  }, [ready, reduced, reverse, durationSeconds]);

  return (
    <div
      ref={rootRef}
      className={cn("group flex w-full overflow-hidden", className)}
      style={{ gap }}
    >
      {Array.from({ length: Math.max(2, copies) }, (_, i) => (
        <div
          key={i}
          data-marquee-track
          // Only the first track is exposed; the rest are duplicates that would
          // otherwise be read out over and over.
          aria-hidden={i > 0}
          className="flex shrink-0 items-center will-change-transform"
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
