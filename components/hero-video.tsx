"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed cinematic background video (Dogpound-style). Autoplays muted on
 * loop with a slow Ken Burns zoom, layered with dark gradient + vignette so
 * overlaid text stays legible. Under reduced-motion it shows the poster still.
 *
 * NOTE: `public/hero.mp4` is a temporary royalty-free clip (Mixkit, free for
 * commercial use, no attribution required). Swap for real Grit Fit footage.
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

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden bg-ink-900", className)}>
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
      ) : (
        <video
          className="h-full w-full scale-105 object-cover opacity-80 will-change-transform animate-kenburns"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      )}

      {/* Cinematic grade: darken + push contrast toward the brand blacks */}
      <div className="absolute inset-0 bg-ink-900/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-ink-900/60" />
      {/* Vignette */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_220px_60px_rgba(7,7,7,0.9)]" />
    </div>
  );
}
