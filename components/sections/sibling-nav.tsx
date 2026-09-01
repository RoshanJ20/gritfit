import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { ActionLabel } from "@/components/sections/action-link";
import { CardEdge } from "@/components/sections/card-edge";
import { SpotlightLink } from "@/components/reactbits/spotlight-link";

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
      <div className="container-grit section-sm">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <div className={cn("mt-8 grid border border-border", cols)}>
          {items.map((m, i) => (
            <Reveal key={m.href} delay={i * 0.06}>
              <SpotlightLink
                href={m.href}
                className="card-charge group flex h-full flex-col gap-4 border-b border-border p-8 transition-colors hover:bg-ink-800 last:border-b-0 sm:border-b-0 sm:[&:not(:last-child)]:border-r sm:border-border lg:p-10"
              >
                <CardEdge />
                <h3 className="display text-4xl transition-colors group-hover:text-brand">
                  {m.name}
                </h3>
                <p className="text-balance leading-relaxed text-muted-foreground">
                  {m.tagline}
                </p>
                <ActionLabel className="mt-auto w-fit">Explore</ActionLabel>
              </SpotlightLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
