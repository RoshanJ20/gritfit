import { rush } from "@/content/rush";
import { cn } from "@/lib/utils";
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
      </div>
      <div className="container-grit grid border-t border-border sm:grid-cols-2">
        {others.map((m, i) => (
          <Reveal key={m.key} delay={i * 0.08}>
            <SpotlightLink
              href={m.href}
              spotlightColor="rgba(174, 217, 35, 0.14)"
              className={cn(
                "card-charge group flex h-full flex-col gap-4 py-8 transition-colors hover:bg-ink-800 sm:py-10",
                i === 0
                  ? "border-b border-border sm:border-b-0 sm:border-r sm:border-border sm:pr-10"
                  : "sm:pl-10",
              )}
            >
              <CardEdge />
              <span className="eyebrow">{m.count} formats</span>
              <h3 className="display text-4xl transition-colors group-hover:text-brand">
                {m.name}
              </h3>
              <p className="mt-2 text-balance leading-relaxed text-muted-foreground">
                {m.tagline}
              </p>
              <ActionLabel className="mt-2 w-fit">
                {`Explore ${m.name}`}
              </ActionLabel>
            </SpotlightLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
