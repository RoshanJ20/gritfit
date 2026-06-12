import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Renders the children twice so the CSS keyframe
 * loop is seamless. Pure CSS — pauses automatically under reduced motion.
 */
export function Marquee({
  children,
  className,
  durationSeconds = 30,
  reverse = false,
  gap = "2rem",
}: {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
  gap?: string;
}) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${durationSeconds}s`,
          "--marquee-gap": gap,
        } as React.CSSProperties
      }
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="animate-marquee flex shrink-0 items-center"
          style={{
            gap,
            paddingRight: gap,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
