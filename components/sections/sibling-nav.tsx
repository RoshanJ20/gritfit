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
  // With a single sibling the grid collapses to one huge, mostly empty box, so
  // those pages get a hairline row instead: name left, tagline beside it, arrow
  // at the end — the same read as the LinkList used elsewhere on the site.
  const single = items.length === 1;
  const cols =
    items.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section className="border-t border-border">
      <div className="container-grit section-sm">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>

        {single ? (
          <div className="mt-6 flex flex-col">
            {items.map((m) => (
              <Reveal key={m.href}>
                <SpotlightLink
                  href={m.href}
                  className="group flex flex-col gap-2 border-t border-border py-7 transition-colors last:border-b hover:text-brand sm:grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_1.5rem] sm:items-center sm:gap-8"
                >
                  <span className="display text-3xl transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:text-4xl">
                    {m.name}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground sm:col-start-2">
                    {m.tagline}
                  </span>
                  <span
                    aria-hidden
                    className="hidden text-brand transition-transform group-hover:translate-x-1 sm:col-start-3 sm:block sm:justify-self-end"
                  >
                    →
                  </span>
                </SpotlightLink>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={cn("mt-8 grid border border-border", cols)}>
            {items.map((m, i) => (
              <Reveal key={m.href} delay={i * 0.06}>
                <SpotlightLink
                  href={m.href}
                  className="card-charge group flex h-full flex-col gap-4 border-b border-border p-8 transition-colors last:border-b-0 hover:bg-ink-800 sm:border-b-0 sm:border-border sm:[&:not(:last-child)]:border-r lg:p-10"
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
        )}
      </div>
    </section>
  );
}
