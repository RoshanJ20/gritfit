"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { heroMediaVersion } from "@/lib/media-version";

/**
 * Full-bleed cinematic background video (Dogpound-style). Autoplays muted on
 * loop with a slow Ken Burns zoom. The footage is rendered black-and-white
 * (grayscale), then darkened toward the bottom so the white wordmark resting on
 * the edge stays legible. Under reduced-motion it shows the poster.
 *
 * NOTE: `public/hero.mp4` is a temporary royalty-free clip (Pexels, free for
 * commercial use); swap for real footage.
 *
 * The media URLs carry a build-time content hash (`?v=`). Files under `public/`
 * keep a stable URL across deploys, so without the stamp a browser holding the
 * previous clip replays it for a beat on reload before revalidation swaps in
 * the new bytes — the flash seen on the hosted site. The stamp gives every
 * version its own cache key. See `scripts/gen-media-version.mjs`.
 */
export function HeroVideo({
  src = "/hero.mp4",
  poster = "/hero-poster.jpg",
  className,
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const stamp = (url: string) => `${url}?v=${heroMediaVersion}`;
  const mediaClass =
    "h-full w-full object-cover grayscale contrast-105 brightness-135";

  return (
    <div
      className={cn(
        // `hero-exit-media` scales the footage back a touch as the first screen
        // is scrolled past, so the hero recedes rather than sliding off. It is
        // a scroll-driven CSS animation (see globals.css) — compositor work,
        // not a per-frame JS transform.
        "hero-exit-media absolute inset-0 -z-10 overflow-hidden bg-ink-900",
        className,
      )}
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={stamp(poster)} alt="" className={mediaClass} />
      ) : (
        <video
          className={cn(
            mediaClass,
            "scale-105 will-change-transform animate-kenburns",
          )}
          src={stamp(src)}
          poster={stamp(poster)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      )}

      {/* Darken toward the bottom so the wordmark reads; gentle vignette. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/5 to-ink-900/50" />
      {/* A second scrim that deepens on scroll, so the footage dims as the
          hero leaves rather than staying lit all the way out. */}
      <div
        aria-hidden
        className="hero-exit-scrim absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/20 opacity-0"
      />
      <div className="absolute inset-0 [box-shadow:inset_0_0_200px_30px_rgba(7,7,7,0.55)]" />
    </div>
  );
}
