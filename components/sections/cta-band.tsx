import Link from "next/link";

import { primaryCta, secondaryCta } from "@/content/nav";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * Closing call-to-action band reused at the bottom of interior pages.
 */
export function CtaBand({
  eyebrow = "Your first step starts here",
  heading = "Show up. Trust the process. Do the work.",
  body = "Every first-timer begins with a complimentary assessment. No pressure. No expectations. Just a clear starting line.",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
}) {
  return (
    <section className="container-grit py-28 text-center lg:py-40">
      <Reveal>
        <p className="eyebrow justify-center">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display mx-auto mt-6 text-display-1 max-w-[16ch]">
          {heading}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">{body}</p>
      </Reveal>
      <Reveal
        delay={0.24}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic strength={0.45}>
          <Link href={secondaryCta.href} className="btn btn-solid px-8 py-4">
            {secondaryCta.label}
          </Link>
        </Magnetic>
        <Link href={primaryCta.href} className="btn btn-outline px-8 py-4">
          {primaryCta.label}
        </Link>
      </Reveal>
    </section>
  );
}
