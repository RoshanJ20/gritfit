import Link from "next/link";

import { cn, whatsappUrl } from "@/lib/utils";
import { primaryCta, secondaryCta } from "@/content/nav";
import { SentenceLines } from "@/components/sections/sentence-lines";
import { Reveal } from "@/components/motion/reveal";
import { CtaActions } from "@/components/sections/cta-actions";

/**
 * Closing call-to-action band reused at the bottom of interior pages.
 * `className` can override the default vertical padding on shorter pages.
 */
export function CtaBand({
  eyebrow = "Your first step starts here",
  heading = "Show up. Trust the process. Feel the difference.",
  body = "Every first-timer begins with a complimentary Performance Assessment. No pressure. No expectations. Just a clear starting line.",
  className,
  uniformActions = false,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  className?: string;
  /** Use the main club pages' shared button pair instead of the default one. */
  uniformActions?: boolean;
}) {
  return (
    <section className={cn("container-grit section text-center", className)}>
      <Reveal>
        <p className="eyebrow justify-center">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display mx-auto mt-6 text-display-1 max-w-[24ch]">
          <SentenceLines text={heading} />
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">{body}</p>
      </Reveal>
      {uniformActions ? (
        <CtaActions className="mt-10" />
      ) : (
        <Reveal
          delay={0.24}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href={secondaryCta.href} className="btn btn-solid px-8 py-4">
            {secondaryCta.label}
          </Link>
          {/* Bottom-of-page "Join Club" opens WhatsApp directly rather than
              routing to /membership — the header and footer keep the nav link. */}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline px-8 py-4"
          >
            {primaryCta.label}
          </a>
        </Reveal>
      )}
    </section>
  );
}
