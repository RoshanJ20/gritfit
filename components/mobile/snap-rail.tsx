"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Mobile swipe deck. A horizontal, edge-to-edge scroller built entirely on
 * native CSS scroll-snap — the browser handles the momentum and snapping on the
 * compositor thread, so it stays smooth on low-end phones with zero scroll-driven
 * JS. The only script is a passive listener that moves the progress dots, and it
 * writes state solely when the active card actually changes.
 *
 * Intended to be rendered inside a `lg:hidden` wrapper; the desktop layout keeps
 * its own grid untouched. Each direct child becomes one snap slide — pass the
 * cards as children and set their width (e.g. `w-[82vw]`).
 *
 * `edge-bleed` pulls the track out to the screen edges (see globals.css); the
 * inner padding then insets the first/last card back to the content gutter so
 * the deck lines up with everything above it while still bleeding as it scrolls.
 */
export function SnapRail({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    setCount(el.children.length);
  }, [children]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const c = el.children[i] as HTMLElement;
      const center = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(center - mid);
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    setActive((prev) => (prev === nearest ? prev : nearest));
  };

  return (
    <div className={className}>
      <div
        ref={scroller}
        onScroll={onScroll}
        aria-label={ariaLabel}
        className={cn(
          "edge-bleed flex snap-x snap-mandatory gap-3 overflow-x-auto",
          "scroll-px-5 px-5 pb-1 sm:scroll-px-8 sm:px-8",
          "[-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "[&>*]:shrink-0 [&>*]:snap-start",
        )}
      >
        {children}
      </div>

      {count > 1 && (
        <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-[3px] rounded-full transition-all duration-300 ease-out",
                i === active ? "w-5 bg-brand" : "w-[3px] bg-foreground/25",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
