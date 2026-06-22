import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Highlighted callout box — used for "Recommended use" protocols and similar
 * short, important statements.
 *
 * Pass `glow` for an animated brand-tinted border sheen that slowly travels the
 * frame — a richer treatment for the recovery/training protocols. Default is
 * the original static brand-tinted box. The sheen is pure CSS, so the global
 * reduced-motion block pauses it automatically.
 */
export function Callout({
  label,
  children,
  glow = false,
}: {
  label: string;
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={cn(
          "relative p-8 lg:p-10",
          glow
            ? "callout-glow isolate overflow-hidden bg-brand/[0.06]"
            : "border border-brand/30 bg-brand/[0.06]",
        )}
      >
        <p className="eyebrow">{label}</p>
        <p className="mt-4 text-xl font-medium leading-snug text-foreground sm:text-2xl">
          {children}
        </p>
        {glow && (
          <style>{`
            .callout-glow { border: 1px solid color-mix(in srgb, var(--brand) 30%, transparent); }
            .callout-glow::before {
              content: "";
              position: absolute;
              inset: -1px;
              z-index: -1;
              border-radius: inherit;
              background: conic-gradient(
                from var(--glow-angle, 0deg),
                transparent 0deg,
                color-mix(in srgb, var(--brand-glow) 90%, transparent) 60deg,
                transparent 150deg,
                transparent 360deg
              );
              -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              padding: 1px;
              animation: callout-rotate 6s linear infinite;
            }
            @property --glow-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
            @keyframes callout-rotate { to { --glow-angle: 360deg; } }
          `}</style>
        )}
      </div>
    </Reveal>
  );
}
