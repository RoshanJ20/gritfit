"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Parallax wrapper: translates its children vertically as the element scrolls
 * through the viewport. Wrap a <MediaPlaceholder> or image with it.
 *
 * Drives off the cheap viewport `scrollY` and a scroll range that is measured
 * only on mount / layout change — NOT every frame. (Framer's element-targeted
 * `useScroll({ target })` forces a layout read on every scroll frame; with many
 * parallax blocks on a page that per-frame reflow janks smooth scrolling.)
 */
export function ParallaxMedia({
  children,
  className,
  /** How far (px) the content drifts across the full scroll range. */
  amount = 80,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // [enterY, exitY] in document coordinates: enterY = element top reaches the
  // viewport bottom; exitY = element bottom reaches the viewport top.
  const [range, setRange] = useState<[number, number]>([0, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const vh = window.innerHeight;
      const enter = top - vh;
      const exit = top + rect.height;
      setRange([enter, exit === enter ? enter + 1 : exit]);
    };

    measure();
    // Re-measure only when layout actually changes, never per scroll frame.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (document.body) ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const y = useTransform(scrollY, range, [amount, -amount]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
