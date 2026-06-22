import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export type LinkListItem = {
  name: string;
  href: string;
  note?: string;
};

/**
 * Stacked, hairline-separated list of links — name + optional note + arrow.
 * Scales cleanly to any number of items (used for program cross-links).
 */
export function LinkList({
  eyebrow,
  items,
}: {
  eyebrow?: string;
  items: LinkListItem[];
}) {
  return (
    <section className="border-t border-border">
      <div className="container-grit py-16 lg:py-20">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-4">{eyebrow}</p>
          </Reveal>
        )}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <Reveal key={item.href} delay={i * 0.05}>
              <Link
                href={item.href}
                className="group flex flex-col gap-2 border-t border-border py-7 transition-colors last:border-b hover:text-brand sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <span className="relative inline-block w-fit transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  <span className="display text-3xl sm:text-4xl">
                    {item.name}
                  </span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </span>
                {item.note && (
                  <span className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                    {item.note}
                  </span>
                )}
                <span className="hidden text-brand transition-transform group-hover:translate-x-1 sm:block">
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
