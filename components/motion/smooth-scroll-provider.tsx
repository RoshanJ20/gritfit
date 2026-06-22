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

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
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
