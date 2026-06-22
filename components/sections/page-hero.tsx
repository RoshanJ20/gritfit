import { Reveal, SplitText } from "@/components/motion/reveal";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { cn } from "@/lib/utils";

type TextPosition = "left-center" | "bottom-left" | "center";

/**
 * Standard interior-page hero: small eyebrow, large display title, lead copy,
 * and an optional parallax media block. Sits below the fixed header (top
 * padding clears it) and animates on mount.
 *
 * Pass `backgroundImage` to switch to the full-bleed variant: the photo fills
 * the section behind the text, a directional scrim keeps the copy legible, and
 * the image dissolves into the page background at the bottom so it flows
 * seamlessly into the next section on scroll.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  mediaLabel,
  mediaKind = "image",
  backgroundImage,
  textPosition = "left-center",
  imagePosition = "center",
}: {
  eyebrow: string;
  title: string;
  lead?: string[];
  mediaLabel?: string;
  mediaKind?: "image" | "video";
  /** When set, renders the full-bleed background-image variant. */
  backgroundImage?: string;
  /** Placement of the copy over the image. */
  textPosition?: TextPosition;
  /** CSS object-position for the image (e.g. "center", "top", "70% 30%"). */
  imagePosition?: string;
}) {
  if (backgroundImage) {
    return (
      <ImmersiveHero
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        backgroundImage={backgroundImage}
        textPosition={textPosition}
        imagePosition={imagePosition}
      />
    );
  }

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

/** Full-bleed photographic hero — see PageHero `backgroundImage`. */
function ImmersiveHero({
  eyebrow,
  title,
  lead,
  backgroundImage,
  textPosition,
  imagePosition,
}: {
  eyebrow: string;
  title: string;
  lead?: string[];
  backgroundImage: string;
  textPosition: TextPosition;
  imagePosition: string;
}) {
  // Where the copy sits within the section.
  const place: Record<TextPosition, string> = {
    "left-center": "items-center justify-start text-left",
    "bottom-left": "items-end justify-start text-left",
    center: "items-center justify-center text-center",
  };

  // Directional darkening so the copy stays legible over any photo. Anchored to
  // the same side as the text and always heaviest toward the bottom.
  const scrim: Record<TextPosition, string> = {
    "left-center":
      "bg-gradient-to-r from-background via-background/55 to-background/10",
    "bottom-left":
      "bg-gradient-to-tr from-background via-background/45 to-transparent",
    center: "bg-background/45",
  };

  return (
    <section className="relative isolate flex min-h-[78vh] overflow-hidden border-b border-border lg:min-h-[82vh]">
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundImage}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: imagePosition }}
      />

      {/* Legibility scrim (directional) */}
      <div
        className={cn("pointer-events-none absolute inset-0 -z-10", scrim[textPosition])}
        aria-hidden
      />
      {/* Top fade — keeps the fixed header/nav readable over bright photos */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-background to-transparent"
        aria-hidden
      />
      {/* Bottom fade — dissolves the image into the page so it flows into the
          next section seamlessly on scroll */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <div
        className={cn(
          "container-grit relative z-10 flex w-full pb-20 pt-32 lg:pb-28 lg:pt-36",
          place[textPosition],
        )}
      >
        <div className={cn("max-w-2xl", textPosition === "center" && "mx-auto")}>
          <Reveal playOnMount>
            <p className={cn("eyebrow", textPosition === "center" && "justify-center")}>
              {eyebrow}
            </p>
          </Reveal>
          <h1 className="display mt-5 text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.05] pb-[0.08em] [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]">
            <SplitText text={title} by="word" stagger={0.06} playOnMount />
          </h1>
          {lead && (
            <div
              className={cn(
                "mt-7 max-w-xl space-y-4",
                textPosition === "center" && "mx-auto",
              )}
            >
              {lead.map((p, i) => (
                <Reveal key={i} delay={0.3 + i * 0.08} y={14} playOnMount>
                  <p className="text-balance leading-relaxed text-foreground/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
