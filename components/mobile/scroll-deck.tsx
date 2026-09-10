"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

/**
 * Mobile scroll-driven horizontal deck.
 *
 * The section pins to the screen and its cards translate sideways as the reader
 * scrolls *vertically* — so every card is walked through in order, with no
 * separate horizontal gesture to discover. Each card is sized to one screen, so
 * nothing is clipped.
 *
 * Progressive enhancement + performance:
 *  - Base markup (no JS, or reduced-motion) is a normal horizontal swipe rail —
 *    fully usable on its own.
 *  - The pin + scrub is added only below `lg` and only when motion is allowed,
 *    via `gsap.matchMedia` (which reverts cleanly at desktop / on resize). It
 *    reuses the GSAP + ScrollTrigger already registered and Lenis-synced by the
 *    smooth-scroll provider — no new dependency.
 *  - The only animated property is the track's `transform: translateX` (plus a
 *    scaleX progress bar) — compositor work, not layout.
 *
 * Rendered inside a `lg:hidden` wrapper; desktop keeps its own grid untouched.
 */
export function ScrollDeck({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      () => {
        // The distance the track must travel so the last card's right edge
        // lines up with the screen's right edge.
        const distance = () =>
          Math.max(0, trackEl.scrollWidth - sectionEl.clientWidth);

        // Turn off the fallback's native horizontal scroll while pinned so the
        // two scroll axes never fight. gsap.set is reverted by matchMedia.
        gsap.set(sectionEl, { overflowX: "hidden" });

        gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      aria-label={ariaLabel}
      className={cn(
        // Base (fallback): a full-height horizontal swipe rail.
        "relative flex h-[100svh] snap-x snap-mandatory items-center overflow-x-auto",
        "[-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div
        ref={track}
        className="flex h-full items-center gap-[4vw] px-[7vw] [&>*]:snap-center"
      >
        {children}
      </div>
    </section>
  );
}
