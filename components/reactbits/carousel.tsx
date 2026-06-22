"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Draggable, snapping horizontal carousel. Restyled from ReactBits' Carousel:
 * each child is one slide; drag to flick, release to snap, dots/arrow-keys to
 * jump. Under reduced motion it degrades to a native horizontal scroll strip
 * with no drag physics.
 */
export function Carousel({
  children,
  className,
}: {
  children: React.ReactNode[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const count = children.length;

  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const slideStep = first.offsetWidth + gap;
    setStep(slideStep);
    setMaxDrag(Math.max(0, track.scrollWidth - viewport.offsetWidth));
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(count - 1, i));
      setIndex(clamped);
      if (reduced) {
        viewportRef.current?.scrollTo({
          left: clamped * step,
          behavior: "smooth",
        });
        return;
      }
      const target = Math.max(-maxDrag, Math.min(0, -clamped * step));
      animate(x, target, { type: "spring", stiffness: 260, damping: 32 });
    },
    [count, step, maxDrag, reduced, x],
  );

  if (reduced) {
    return (
      <div className={cn("w-full", className)}>
        <div
          ref={viewportRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children.map((child, i) => (
            <div key={i} className="min-w-[85%] shrink-0 snap-start sm:min-w-[48%]">
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("w-full focus:outline-none", className)}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            const predicted = x.get() + info.velocity.x * 0.2;
            goTo(Math.round(-predicted / step));
          }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="min-w-[85%] shrink-0 select-none sm:min-w-[48%] lg:min-w-[40%]"
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {children.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-brand" : "w-1.5 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}
