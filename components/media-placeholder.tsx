import { cn } from "@/lib/utils";
import { ImageIcon, Film } from "lucide-react";
import { TiltedCard } from "@/components/reactbits/tilted-card";

type Ratio = "video" | "square" | "portrait" | "wide" | "auto";

const ratioClass: Record<Ratio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
  auto: "",
};

/**
 * Stands in for real photography / video, which doesn't exist yet. Branded,
 * clearly a placeholder, with a subtle animated shimmer so layouts read as
 * intentional rather than broken. Swap for <Image>/<video> when assets arrive.
 *
 * Pass `interactive` to give the slot a 3D tilt + glare on hover (via
 * TiltedCard). Pass `src` to render a real image filling the slot — all site
 * imagery is rendered black-and-white (grayscale) with a darkening vignette so
 * the wash reads as intentional. Set `tint={false}` to drop the vignette (the
 * image stays black-and-white regardless).
 */
export function MediaPlaceholder({
  label = "Image",
  ratio = "video",
  kind = "image",
  interactive = false,
  src,
  imagePosition = "center",
  tint = true,
  className,
}: {
  label?: string;
  ratio?: Ratio;
  kind?: "image" | "video";
  interactive?: boolean;
  /** When set, renders this image filling the slot instead of the placeholder. */
  src?: string;
  /** CSS object-position for the image (e.g. "center", "top", "50% 30%"). */
  imagePosition?: string;
  /** Apply the darkening vignette over the (always grayscale) image (default true). */
  tint?: boolean;
  className?: string;
}) {
  const Icon = kind === "video" ? Film : ImageIcon;
  const surface = (
    <div
      data-media-placeholder
      className={cn(
        "group relative isolate flex w-full items-center justify-center overflow-hidden rounded-md border border-border bg-ink-800",
        ratioClass[ratio],
        className,
      )}
    >
      {src ? (
        // Real asset — fills the same slot the placeholder occupied, graded to
        // the brand duotone (matching HeroVideo) for site-wide consistency.
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label}
            loading="lazy"
            className={cn(
              // Always black-and-white — no exceptions across the site.
              "absolute inset-0 h-full w-full object-cover grayscale contrast-110 brightness-105",
              interactive &&
                "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            )}
            style={{ objectPosition: imagePosition }}
          />
          {tint && (
            <>
              {/* darken + gentle vignette so the wash reads as intentional */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-ink-900/20" aria-hidden />
              <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_120px_30px_rgba(7,7,7,0.65)]" aria-hidden />
            </>
          )}
        </>
      ) : (
        <>
          {/* shimmer sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent [animation:shimmer_2.8s_ease-in-out_infinite]" />
          {/* hatch texture — drifts slightly on hover for the interactive variant */}
          <div
            className={cn(
              "absolute inset-0 opacity-[0.05]",
              interactive &&
                "transition-transform duration-700 ease-out group-hover:scale-110",
            )}
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--brand) 0 1px, transparent 1px 14px)",
            }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col items-center gap-2 text-muted-foreground">
            <Icon className="size-6 text-brand/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
              {label}
            </span>
          </div>
          <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}60%,100%{transform:translateX(100%)}}`}</style>
        </>
      )}
    </div>
  );

  if (interactive) {
    return (
      <TiltedCard max={7} className="h-full [&>[data-media-placeholder]]:h-full">
        {surface}
      </TiltedCard>
    );
  }
  return surface;
}
