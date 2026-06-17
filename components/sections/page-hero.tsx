import { Reveal, SplitText } from "@/components/motion/reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";

/**
 * Standard interior-page hero: small eyebrow, large display title, lead copy,
 * and an optional parallax media block. Sits below the fixed header (top
 * padding clears it) and animates on mount.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  mediaLabel,
  mediaKind = "image",
}: {
  eyebrow: string;
  title: string;
  lead?: string[];
  mediaLabel?: string;
  mediaKind?: "image" | "video";
}) {
  return (
    <section className="bg-spotlight relative overflow-hidden border-b border-border pb-16 pt-28 lg:pb-24 lg:pt-32">
      <div className="pointer-events-none absolute -left-40 top-10 size-[32rem] rounded-full bg-white/[0.03] blur-[120px]" />

      <div className="container-grit relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <Reveal playOnMount>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <h1 className="display mt-5 text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.05] pb-[0.08em]">
            <SplitText text={title} by="word" stagger={0.06} playOnMount />
          </h1>
          {lead && (
            <div className="mt-7 max-w-xl space-y-4">
              {lead.map((p, i) => (
                <Reveal key={i} delay={0.3 + i * 0.08} y={14} playOnMount>
                  <p className="text-balance leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {mediaLabel && (
          <Reveal playOnMount delay={0.2} y={40}>
            <ParallaxMedia amount={28} className="aspect-[4/5] lg:aspect-square">
              <MediaPlaceholder
                label={mediaLabel}
                kind={mediaKind}
                ratio="auto"
                className="h-full rounded-none border-0"
              />
            </ParallaxMedia>
          </Reveal>
        )}
      </div>
    </section>
  );
}
