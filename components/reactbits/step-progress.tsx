"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type Step = { step: string; title: string; body: string };

/**
 * The how-it-works steps, threaded by a lime progress line that fills as the
 * section scrolls through view. Restyled from ReactBits' Stepper concept but
 * kept editorial: same 3-up grid as the rest of the site, with a connecting
 * rail (horizontal on desktop, vertical on mobile) and step numbers that pop
 * as the fill reaches them. Reduced motion → a static, fully-filled rail.
 */
export function StepProgress({
  steps,
  className,
}: {
  steps: Step[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3",
        className,
      )}
    >
      {/* Rail track + fill — desktop (horizontal) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-[4.6rem] z-10 hidden h-px bg-border md:block"
      >
        <motion.div
          className="h-full origin-left bg-brand"
          style={reduced ? { width: "100%" } : { width: fill }}
        />
      </div>
      {/* Rail track + fill — mobile (vertical) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-[2.6rem] top-[4.6rem] z-10 w-px bg-border md:hidden"
      >
        <motion.div
          className="w-full origin-top bg-brand"
          style={reduced ? { height: "100%" } : { height: fill }}
        />
      </div>

      {steps.map((s, i) => {
        const threshold = i / Math.max(1, steps.length - 1);
        return (
          <div key={s.step} className="relative bg-ink-900 p-8 lg:p-10">
            <StepNumber
              value={s.step}
              progress={scrollYProgress}
              threshold={threshold}
              reduced={!!reduced}
            />
            <h3 className="display mt-4 text-2xl">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        );
      })}
    </div>
  );
}

function StepNumber({
  value,
  progress,
  threshold,
  reduced,
}: {
  value: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  threshold: number;
  reduced: boolean;
}) {
  const scale = useTransform(
    progress,
    [threshold - 0.08, threshold, threshold + 0.08],
    [1, 1.25, 1],
  );
  return (
    <motion.span
      style={reduced ? undefined : { scale }}
      className="display relative z-20 inline-block text-3xl text-brand"
    >
      {value}
    </motion.span>
  );
}
