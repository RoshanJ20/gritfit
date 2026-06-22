import { rush } from "@/content/rush";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightLink } from "@/components/reactbits/spotlight-link";

/**
 * Bottom-of-page nav to the other two RUSH models. Pass the current model key
 * to exclude it.
 */
export function ModelNav({ current }: { current: "peak" | "flow" | "skilllab" }) {
  const others = rush.models.filter((m) => m.key !== current);
  return (
    <section className="border-t border-border">
      <div className="container-grit py-16 lg:py-20">
        <Reveal>
          <p className="eyebrow">More RUSH</p>
        </Reveal>
      </div>
      <div className="grid border-t border-border sm:grid-cols-2">
        {others.map((m, i) => (
          <Reveal key={m.key} delay={i * 0.08}>
            <SpotlightLink
              href={m.href}
              spotlightColor="rgba(174, 217, 35, 0.14)"
              className="group flex h-full flex-col gap-4 border-b border-border p-8 transition-colors hover:bg-ink-800 sm:border-b-0 sm:p-10 sm:[&:first-child]:border-r sm:[&:first-child]:border-border"
            >
              <span className="eyebrow">{m.count} formats</span>
              <h3 className="display text-4xl transition-colors group-hover:text-brand">
                {m.name}
              </h3>
              <p className="mt-2 text-balance leading-relaxed text-muted-foreground">
                {m.tagline}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors group-hover:text-brand">
                Explore {m.name}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </SpotlightLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
