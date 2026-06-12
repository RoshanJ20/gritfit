import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export type SiblingItem = {
  name: string;
  href: string;
  tagline: string;
};

/**
 * Bottom-of-page grid linking to sibling pages within a section.
 */
export function SiblingNav({
  eyebrow = "Explore",
  items,
}: {
  eyebrow?: string;
  items: SiblingItem[];
}) {
  const cols =
    items.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <section className="border-t border-border">
      <div className="container-grit py-16 lg:py-20">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      </div>
      <div className={cn("grid border-t border-border", cols)}>
        {items.map((m, i) => (
          <Reveal key={m.href} delay={i * 0.06}>
            <Link
              href={m.href}
              className="group flex h-full flex-col gap-4 border-b border-border p-8 transition-colors hover:bg-ink-800 lg:border-b-0 lg:border-r lg:p-10 lg:last:border-r-0"
            >
              <h3 className="display text-4xl transition-colors group-hover:text-brand">
                {m.name}
              </h3>
              <p className="text-balance leading-relaxed text-muted-foreground">
                {m.tagline}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors group-hover:text-brand">
                Explore
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
