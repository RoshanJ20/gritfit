import { cn } from "@/lib/utils";

/**
 * A restrained sheen that sweeps across a single accent word. Restyled from
 * ReactBits' ShinyText: a brand-tinted highlight travels through clipped text.
 * Pure CSS, so the global reduced-motion block pauses it automatically. Use on
 * ONE word per page, sparingly — green is a punctuation, not a paragraph.
 */
export function ShinyText({
  children,
  className,
  speed = 4,
}: {
  children: string;
  className?: string;
  speed?: number;
}) {
  return (
    <span
      className={cn("shiny-text bg-clip-text text-transparent", className)}
      style={{ animationDuration: `${speed}s` } as React.CSSProperties}
    >
      {children}
      <style>{`
        .shiny-text {
          background-image: linear-gradient(
            110deg,
            var(--foreground) 0%,
            var(--foreground) 40%,
            var(--brand-glow) 50%,
            var(--foreground) 60%,
            var(--foreground) 100%
          );
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shiny-sweep linear infinite;
        }
        @keyframes shiny-sweep {
          from { background-position: 220% 0; }
          to { background-position: -120% 0; }
        }
      `}</style>
    </span>
  );
}
