"use client";

import { useRef } from "react";
import {
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Pins a sticky stage while the page scrolls through `heightVh` of space, and
 * hands a 0→1 `progress` MotionValue to its render-prop children so they can
 * drive scrubbed timelines (text swaps, scaling, horizontal motion, etc.).
 *
 * Uses CSS sticky rather than GSAP pinning so it stays in lockstep with Lenis
 * smooth scroll. GSAP remains available for fully bespoke scenes.
 */
export function PinnedScene({
  children,
  className,
  stageClassName,
  heightVh = 300,
}: {
  children: (progress: MotionValue<number>) => React.ReactNode;
  className?: string;
  stageClassName?: string;
  heightVh?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ height: reduced ? "auto" : `${heightVh}vh` }}
    >
      <div
        className={cn(
          "top-0 flex h-screen items-center overflow-hidden",
          reduced ? "relative" : "sticky",
          stageClassName,
        )}
      >
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
