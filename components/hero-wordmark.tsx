"use client";

import { useEffect, useState } from "react";

import { Rise } from "@/components/motion/reveal";

/**
 * The home hero wordmark, held until the intro curtain lifts.
 *
 * `Rise playOnMount` on its own would fire at hydration — underneath the
 * curtain — so by the time the black lifted the letters would already be
 * standing there and the best moment on the site would be spent on nobody.
 * When the intro is running this waits for `gf:intro-lift` instead, so the
 * curtain and the wordmark are one continuous move. When the intro is skipped
 * (a returning visitor, reduced motion, an interior route) it plays
 * immediately, exactly as before.
 *
 * `.hero-exit-wordmark` carries the scroll-driven exit; globals.css suppresses
 * that animation while the intro is running, so the two never overlap.
 */
export function HeroWordmark() {
  // Renders held on the server, which is also Rise's own resting state, so
  // there is no hydration mismatch and no flash of a standing wordmark.
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const release = () => setPlay(true);
    window.addEventListener("gf:intro-lift", release, { once: true });

    // Covers the two cases the event cannot: the intro was skipped outright,
    // and the (unlikely) race where it lifted before this subscribed. Checked
    // on the next frame rather than inline, so the effect never sets state
    // synchronously and cascades a render.
    const frame = requestAnimationFrame(() => {
      if (document.documentElement.dataset.gfIntro !== "run") setPlay(true);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("gf:intro-lift", release);
    };
  }, []);

  return (
    <h1
      aria-label="Grit Fit"
      className="wordmark hero-exit-wordmark flex items-end justify-center gap-[0.07em] text-foreground"
    >
      <Rise play={play} duration={1.1}>
        Grit
      </Rise>
      <Rise play={play} delay={0.12} duration={1.1}>
        Fit
      </Rise>
    </h1>
  );
}
