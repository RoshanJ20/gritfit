import { cn } from "@/lib/utils";

/**
 * Marks a fact we do NOT yet have a confirmed source for (prices, hours, phone,
 * coach names, testimonials…). Rendered distinctly so it's never mistaken for
 * real copy. Per the brief: real content is verbatim from source; everything
 * unknown is an obvious placeholder — no invented facts.
 */
export function Placeholder({
  children,
  label = "Placeholder",
  className,
}: {
  children?: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <span
      data-placeholder
      title={`${label} — pending confirmed content`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-dashed border-brand/50 bg-brand/5 px-2 py-0.5 align-baseline text-brand/90",
        className,
      )}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
      {children ?? label}
    </span>
  );
}
