import { Reveal } from "@/components/motion/reveal";

/**
 * Highlighted callout box — used for "Recommended use" protocols and similar
 * short, important statements.
 */
export function Callout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="border border-brand/30 bg-brand/[0.06] p-8 lg:p-10">
        <p className="eyebrow">{label}</p>
        <p className="mt-4 text-xl font-medium leading-snug text-foreground sm:text-2xl">
          {children}
        </p>
      </div>
    </Reveal>
  );
}
