"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts from `from` to `to` once when scrolled into view. Restyled from
 * ReactBits' CountUp — used for the editorial indices and "N formats" counts.
 * `pad` zero-pads the result (e.g. pad=2 → "07"). Reduced motion renders the
 * final value immediately.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.4,
  className,
  pad = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  pad?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : from);

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration]);

  const text = pad > 0 ? String(value).padStart(pad, "0") : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
