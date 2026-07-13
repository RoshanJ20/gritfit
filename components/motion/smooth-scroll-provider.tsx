"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig, useReducedMotion } from "motion/react";

let registered = false;

/**
 * Drives Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync with it.
 * A single RAF loop ticks both. Disabled entirely when the user prefers
 * reduced motion, falling back to native scrolling.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    if (reduced) return;

    // smoothWheel is intentionally OFF. Lenis's wheel smoothing hijacks the
    // native wheel (preventDefault + re-drives scroll from its own RAF loop).
    // On this image-heavy site a single heavy paint frame can stall that loop
    // or desync its scroll target, leaving the wheel dead while the native
    // scrollbar still works — the recurring "stuck scroll" bug. Native wheel
    // scrolling cannot get stuck this way. Lenis is kept only for smooth
    // programmatic/anchor scrolling and to keep ScrollTrigger in sync.
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: false,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Lenis caches the max-scroll limit at init and only recomputes it on a
    // window resize. When the document grows taller *after* that (late-loading
    // images, web-font reflow, hover/accordion-expanding sections), the cached
    // limit stays stale and Lenis clamps the wheel to it — a hard "can't scroll
    // past here" stop, even though native scrollbar dragging still reaches the
    // bottom. Re-measure whenever the document's height actually changes.
    let raf = 0;
    const remeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    };
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, [reduced]);

  // Reset scroll position + refresh triggers on navigation.
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  // `reducedMotion="user"` makes every motion component honor the OS
  // preference: transforms/movement are dropped while opacity still resolves,
  // so scroll reveals degrade to a clean fade-free static state. Primitives
  // that need to fully no-op (canvas grid, drag carousel, tilt) check
  // useReducedMotion themselves in addition to this.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
