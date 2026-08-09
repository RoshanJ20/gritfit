import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";
import type { ClassFormat } from "@/content/rush";
import { rushFormatImages } from "@/content/rush-media";

/**
 * Renders a list of class formats as numbered, editorial alternating rows —
 * the same rhythm as the homepage pillars. Media side alternates each row.
 */
export function FormatList({
  formats,
  startIndex = 1,
  mediaKind = "video",
  images,
}: {
  formats: ClassFormat[];
  startIndex?: number;
  mediaKind?: "image" | "video";
  /** Optional image map keyed by format name; falls back to RUSH imagery. */
  images?: Record<string, string>;
}) {
  return (
    <div>
      {formats.map((f, i) => {
        const n = String(startIndex + i).padStart(2, "0");
        const flip = i % 2 === 1;
        return (
          <div key={f.name} className="border-b border-border">
            {/* On mobile the number and name ride on the bottom of the photo
                rather than sitting in a block beneath it, so the row reads as
                one captioned image instead of two stacked slabs. The caption is
                pulled up onto the photo and the copy below is pushed down by
                the same amount, so document flow still resolves cleanly — the
                two margins below are a matched pair and must move together.
                Desktop is the original two-column split, untouched. */}
            <div className="container-grit section grid lg:grid-cols-2 lg:items-center lg:gap-20">
              <Reveal className={cn("relative", flip && "lg:order-2")} y={40}>
                <ParallaxMedia amount={34} className="aspect-[4/3]">
                  <MediaPlaceholder
                    label={f.name}
                    kind={mediaKind}
                    ratio="auto"
                    src={images?.[f.name] ?? rushFormatImages[f.name]}
                    className="h-full rounded-none border-0"
                  />
                </ParallaxMedia>
                {/* Legibility scrim under the caption. Fades to --background so
                    the photo dissolves into the page rather than ending on a
                    hard edge. Mobile only — desktop has no overlaid caption. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 via-ink-900/75 to-transparent lg:hidden"
                />
              </Reveal>

              <div className={flip ? "lg:order-1" : ""}>
                {/* Negative margin lifts the caption onto the photo. At lg it
                    resets to 0, which is what the number/name had before, so
                    the desktop column is unchanged. */}
                <div className="relative z-10 -mt-[4.4rem] lg:mt-0">
                  <Reveal>
                    <span className="display text-2xl text-brand">{n}</span>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h3 className="display mt-1 text-display-2 lg:mt-3">
                      {f.name}
                    </h3>
                  </Reveal>
                </div>
                {/* Gives back the height the caption borrowed, so the copy
                    below still clears the photo. A mobile-only spacer rather
                    than margins on the copy itself: the copy's own spacing
                    varies with whether a format has a tagline, and this way
                    that spacing — and the whole desktop column — is untouched. */}
                <div aria-hidden className="h-8 lg:hidden" />
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
