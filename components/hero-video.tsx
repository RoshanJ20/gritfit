"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed cinematic background video (Dogpound-style). Autoplays muted on
 * loop with a slow Ken Burns zoom. The footage is rendered black-and-white
 * (grayscale), then darkened toward the bottom so the white wordmark resting on
 * the edge stays legible. Under reduced-motion it shows the poster.
 *
 * NOTE: `public/hero.mp4` is a temporary royalty-free clip (Mixkit, free for
 * commercial use); swap for real footage.
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
  const mediaClass =
    "h-full w-full object-cover grayscale contrast-110 brightness-105";

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden bg-ink-900", className)}>
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className={mediaClass} />
      ) : (
        <video
          className={cn(
            mediaClass,
            "scale-105 will-change-transform animate-kenburns",
          )}
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

      {/* Darken toward the bottom so the wordmark reads; gentle vignette. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-ink-900/40" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_200px_55px_rgba(7,7,7,0.85)]" />
    </div>
  );
}
