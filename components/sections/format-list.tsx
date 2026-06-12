import { Reveal } from "@/components/motion/reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";
import type { ClassFormat } from "@/content/rush";

/**
 * Renders a list of class formats as numbered, editorial alternating rows —
 * the same rhythm as the homepage pillars. Media side alternates each row.
 */
export function FormatList({
  formats,
  startIndex = 1,
  mediaKind = "video",
}: {
  formats: ClassFormat[];
  startIndex?: number;
  mediaKind?: "image" | "video";
}) {
  return (
    <div>
      {formats.map((f, i) => {
        const n = String(startIndex + i).padStart(2, "0");
        const flip = i % 2 === 1;
        return (
          <div key={f.name} className="border-b border-border">
            <div className="container-grit grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
              <Reveal className={flip ? "lg:order-2" : ""} y={40}>
                <ParallaxMedia amount={34} className="aspect-[4/3]">
                  <MediaPlaceholder
                    label={f.name}
                    kind={mediaKind}
                    ratio="auto"
                    className="h-full rounded-none border-0"
                  />
                </ParallaxMedia>
              </Reveal>

              <div className={flip ? "lg:order-1" : ""}>
                <Reveal>
                  <span className="display text-2xl text-brand">{n}</span>
                </Reveal>
                <Reveal delay={0.06}>
                  <h3 className="display mt-3 text-display-2">{f.name}</h3>
                </Reveal>
                {f.tagline && (
                  <Reveal delay={0.1}>
                    <p className="eyebrow mt-4">{f.tagline}</p>
                  </Reveal>
                )}
                <div className="mt-5 max-w-md space-y-4">
                  {f.paras.map((p, j) => (
                    <Reveal key={j} delay={0.12 + j * 0.05}>
                      <p className="leading-relaxed text-muted-foreground">{p}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
