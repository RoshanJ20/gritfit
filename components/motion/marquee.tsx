import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Pure CSS — pauses automatically under reduced
 * motion.
 *
 * Each copy of the track slides `-100% - gap` of ITS OWN width, so copy n+1
 * lands exactly where copy n started and the loop is seamless. The catch is
 * coverage: at the end of a cycle the whole strip has shifted left by one track
 * width, so with `copies` tracks the right-most content sits at
 * `(copies - 1) × trackWidth`. With only two copies that is a single track
 * width — the moment the content is narrower than the viewport, the tail of the
 * band empties out until the loop restarts.
 *
 * Four copies is the default because it covers any viewport up to roughly three
 * times the natural width of the children, which comfortably clears an ultrawide
 * monitor for a short word list. Extra copies are cheap (they are inert, static
 * markup) and invisible when the content is already wide enough, so this errs
 * on the side of never showing a hole.
 */
export function Marquee({
  children,
  className,
  durationSeconds = 30,
  reverse = false,
  gap = "2rem",
  copies = 4,
}: {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
  gap?: string;
  /** Number of times the track is repeated. Raise it for very short content. */
  copies?: number;
}) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden", className)}
      style={
        {
          gap,
          "--marquee-duration": `${durationSeconds}s`,
          "--marquee-gap": gap,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: Math.max(2, copies) }, (_, i) => (
        <div
          key={i}
          // Only the first track is exposed; the rest are duplicates that would
          // otherwise be read out over and over.
          aria-hidden={i > 0}
          className="animate-marquee flex shrink-0 items-center"
          style={{
            gap,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
