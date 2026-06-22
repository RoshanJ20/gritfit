"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A Next.js <Link> with a built-in cursor-following spotlight glow — the
 * link-card counterpart to SpotlightCard. It layers the glow inside the link
 * without disturbing any classes the caller passes (grid borders, padding,
 * hover background all pass straight through), so existing nav grids keep their
 * exact layout and simply gain depth. No-ops under reduced motion.
 */
export function SpotlightLink({
  href,
  children,
  className,
  spotlightColor = "rgba(174, 217, 35, 0.10)",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={reduced ? undefined : onMove}
      style={{ "--spotlight": spotlightColor } as React.CSSProperties}
      className={cn("group/spot relative isolate overflow-hidden", className)}
    >
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), var(--spotlight) 0%, transparent 60%)",
          }}
        />
      )}
      {children}
    </Link>
  );
}
