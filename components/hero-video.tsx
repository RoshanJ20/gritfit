"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";
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
  const stamp = (url: string) => `${asset(url)}?v=${heroMediaVersion}`;

  // Grade + layout shared by the foreground img/video. On mobile the footage is
  // sized to its own 16:9 box (aspect-video) at full width and centred
  // vertically, which fits the frame WIDTH and leaves bands above and below.
  // Because the element box now equals the visible video, `hero-fg-fade`
  // (globals.css, mobile-only) can feather its top/bottom edges straight into
  // the blurred backdrop — no hard letterbox seam. From `sm` up it resets to
  // full-bleed cover with no mask. The Ken Burns zoom is desktop-only: on
  // mobile its scale-up would re-crop the width and eat into the bands.
  const mediaClass =
    "hero-fg-fade absolute inset-x-0 top-1/2 aspect-video h-auto w-full -translate-y-1/2 object-cover grayscale contrast-105 brightness-135 sm:inset-0 sm:top-0 sm:aspect-auto sm:h-full sm:translate-y-0";

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
      {/* Ambient "ambilight" backdrop — MOBILE ONLY. A blurred, scaled-up copy
          of the same footage (cached under the same URL) fills the whole frame
          behind the letterboxed foreground, so the empty bands take their
          colour/tone from whatever is on screen. Hidden from `sm` up, where the
          foreground covers the frame and no bands exist, so desktop pays
          nothing for it. `aria-hidden`/decorative — the foreground carries the
          content. */}
      {!reduced && (
        <video
          className="absolute inset-0 h-full w-full scale-125 object-cover grayscale blur-2xl brightness-110 will-change-transform animate-kenburns sm:hidden"
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

      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={stamp(poster)} alt="" className={mediaClass} />
      ) : (
        <video
          className={cn(
            mediaClass,
            // Ken Burns + the small resting scale are desktop-only (see above).
            "sm:scale-105 sm:will-change-transform sm:animate-kenburns",
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
