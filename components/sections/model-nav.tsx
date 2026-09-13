import { rush } from "@/content/rush";
import { Reveal } from "@/components/motion/reveal";
import { ActionLabel } from "@/components/sections/action-link";
import { CardEdge } from "@/components/sections/card-edge";
import { SpotlightLink } from "@/components/reactbits/spotlight-link";

/**
 * Bottom-of-page nav to the other two RUSH models. Pass the current model key
 * to exclude it.
 */
export function ModelNav({ current }: { current: "peak" | "flow" | "skilllab" }) {
  const others = rush.models.filter((m) => m.key !== current);
  return (
    <section className="border-t border-border">
      <div className="container-grit section-sm">
        <Reveal>
          <p className="eyebrow">More RUSH</p>
        </Reveal>
        {/* Same boxed grid as SiblingNav / the RUSH hub: uniform padding on
            every card so the text and the CardEdge charge frame sit at the same
            inset on both, rather than the first card's copy hugging the gutter. */}
        <div className="mt-8 grid border border-border sm:grid-cols-2">
          {others.map((m, i) => (
            <Reveal key={m.key} delay={i * 0.08}>
              <SpotlightLink
                href={m.href}
                spotlightColor="rgba(174, 217, 35, 0.14)"
                className="card-charge group flex h-full flex-col gap-4 border-b border-border p-8 transition-colors last:border-b-0 hover:bg-ink-800 sm:border-b-0 sm:border-border sm:[&:not(:last-child)]:border-r lg:p-10"
              >
                <CardEdge />
                <span className="eyebrow">{m.count} formats</span>
                <h3 className="display text-4xl transition-colors group-hover:text-brand">
                  {m.name}
                </h3>
                <p className="mt-2 text-balance leading-relaxed text-muted-foreground">
                  {m.tagline}
                </p>
                <ActionLabel className="mt-auto w-fit pt-2">
                  {`Explore ${m.name}`}
                </ActionLabel>
              </SpotlightLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
