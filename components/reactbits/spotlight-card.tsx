"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Card surface with a cursor-following radial glow. Restyled from ReactBits'
 * SpotlightCard to the Grit palette: a faint lime halo over ink-900 behind a
 * hairline border. The glow lives on an absolutely-positioned layer that fades
 * in on hover; cursor position is fed through CSS vars so there's no per-frame
 * React state. Falls back to a plain bordered surface under reduced motion.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(174, 217, 35, 0.10)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("relative border border-border bg-ink-900", className)}>
        {children}
      </div>
    );
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{ "--spotlight": spotlightColor } as React.CSSProperties}
      className={cn(
        "group/spot relative isolate overflow-hidden border border-border bg-ink-900",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), var(--spotlight) 0%, transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
