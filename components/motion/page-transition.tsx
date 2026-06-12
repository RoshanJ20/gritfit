"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

/**
 * Animates the page content in on every route change. Keyed by pathname so a
 * fresh enter animation runs per navigation. Kept subtle so it layers under the
 * per-section scroll animations rather than competing with them.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
