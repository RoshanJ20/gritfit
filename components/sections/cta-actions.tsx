import Link from "next/link";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * The uniform closing button pair used by the main club pages — Strength Club,
 * RUSH and Trainings. One ask ("Start with Assessment") and one way to browse
 * ("Explore membership options"), worded and ordered identically everywhere so
 * the close reads the same wherever a member lands. Essential Recovery keeps
 * its own close.
 */
export function CtaActions({
  className,
  delay = 0.24,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn("flex flex-wrap items-center justify-center gap-3", className)}
    >
      <Link href="/contact" className="btn btn-solid px-8 py-4">
        Start with Assessment
      </Link>
      <Link href="/membership" className="btn btn-outline px-8 py-4">
        Explore membership options
      </Link>
    </Reveal>
  );
}
