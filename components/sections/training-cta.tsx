import Link from "next/link";

import { training } from "@/content/training";
import { secondaryCta } from "@/content/nav";
import { whatsappUrl } from "@/lib/utils";
import { SentenceLines } from "@/components/sections/sentence-lines";
import { Reveal } from "@/components/motion/reveal";

/**
 * The closing CTA for the Trainings section — "Our standard / We don't sell
 * sessions. We build performance." Every page under Trainings ends on this
 * exact band so the section closes the same way wherever a member lands.
 *
 * `showEtiquette` drops the PT Terms link on the PT Terms page itself, where it
 * would only point back at the page you are already reading.
 */
export function TrainingCta({
  showEtiquette = true,
}: {
  showEtiquette?: boolean;
}) {
  return (
    <section className="container-grit section text-center">
      <Reveal>
        <p className="eyebrow justify-center">{training.standard.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display mx-auto mt-6 text-display-1 max-w-[24ch]">
          <SentenceLines text={training.standard.heading} />
        </h2>
      </Reveal>
      <Reveal
        delay={0.16}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Link href={secondaryCta.href} className="btn btn-solid px-8 py-4">
          Start Assessment
        </Link>
        {/* Bottom-of-page CTA opens WhatsApp — see CtaBand. */}
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline px-8 py-4"
        >
          Train With Us
        </a>
      </Reveal>

      {showEtiquette && (
        <Reveal delay={0.24}>
          <p className="mx-auto mt-12 max-w-xl text-balance text-muted-foreground">
            {training.standard.etiquetteNote}
          </p>
          <Link
            href={training.standard.etiquetteHref}
            className="group mt-4 inline-flex items-center gap-2 text-brand transition-colors hover:text-brand/80"
          >
            {training.standard.etiquetteLabel}
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      )}
    </section>
  );
}
