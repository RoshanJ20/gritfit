"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A drop-in cursor spotlight for an existing surface you don't want to
 * restructure. Render it as the first child of any `relative overflow-hidden`
 * element; it attaches pointer tracking to its parent and paints a brand glow
 * that follows the cursor and fades with hover. Use when SpotlightCard's own
 * border/background would fight an already-styled card (e.g. the highlighted
 * membership tier). No-ops under reduced motion.
 */
export function SpotlightOverlay({
  color = "rgba(174, 217, 35, 0.12)",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onEnter = () => (el.style.opacity = "1");
    const onLeave = () => (el.style.opacity = "0");
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300",
        className,
      )}
      style={{
        background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), ${color} 0%, transparent 60%)`,
      }}
    />
  );
}
