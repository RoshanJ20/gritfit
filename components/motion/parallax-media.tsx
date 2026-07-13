import { cn } from "@/lib/utils";

/**
 * Media wrapper. Previously translated its children on scroll for a parallax
 * effect, but moving large, CSS-filtered (grayscale) image layers every scroll
 * frame forced a full re-raster per frame. Under Lenis smooth scrolling (which
 * emits many frames per wheel tick) that saturated the main thread and made
 * scrolling stutter on every media-heavy page.
 *
 * It now renders its children statically — same box, same aspect ratio, no
 * per-frame work — so scrolling stays smooth. The `amount` prop is accepted for
 * call-site compatibility but no longer used.
 */
export function ParallaxMedia({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  /** @deprecated retained for API compatibility; parallax is disabled. */
  amount?: number;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
