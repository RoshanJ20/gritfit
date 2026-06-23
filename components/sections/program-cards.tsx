import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/reactbits/count-up";
import { SpotlightOverlay } from "@/components/reactbits/spotlight-overlay";

export type ProgramCardItem = {
  name: string;
  href: string;
  note?: string;
};

/**
 * Centered grid of program cards — numbered, with a spotlight hover and a brand
 * hairline that wipes in along the top edge. Matches the offerings/amenities
 * card language. Trailing cards center on the final row.
 */
export function ProgramCards({
  eyebrow,
  items,
}: {
  eyebrow?: string;
  items: ProgramCardItem[];
}) {
  return (
    <section className="border-t border-border">
      <div className="container-grit py-16 lg:py-20">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-10 text-center">{eyebrow}</p>
          </Reveal>
        )}
        <div className="flex flex-wrap justify-center gap-6">
          {items.map((item, i) => (
            <Reveal
              key={item.href}
              delay={(i % 3) * 0.06}
              className="basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[340px] lg:grow-0"
            >
              <Link
                href={item.href}
                className="group relative isolate flex h-full flex-col items-center gap-4 overflow-hidden rounded-md border border-border bg-ink-900 p-8 text-center transition-colors hover:border-brand/40 hover:bg-ink-800 lg:p-10"
              >
                <SpotlightOverlay className="-z-10" />
                {/* brand hairline wipes in along the top edge on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <span className="display text-xl text-brand">
                  <CountUp to={i + 1} pad={2} />
                </span>
                <h3 className="display text-2xl sm:text-3xl">{item.name}</h3>
                {item.note && (
                  <p className="max-w-xs text-balance text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                    {item.note}
                  </p>
                )}
                <span
                  aria-hidden
                  className="mt-1 text-brand transition-transform duration-500 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
