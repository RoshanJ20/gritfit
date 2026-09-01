"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset to travel, in px. */
  y?: number;
  /** Seconds to wait before animating. */
  delay?: number;
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
  /** Play on mount instead of on scroll-into-view (for above-the-fold/hero). */
  playOnMount?: boolean;
  as?: "div" | "section" | "span" | "li";
};

/**
 * Generic reveal: fades + slides its children up. Triggers on scroll-into-view
 * by default; pass `playOnMount` for above-the-fold content that should animate
 * immediately. The workhorse wrapper used across every section.
 */
export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  once = true,
  playOnMount = false,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const trigger = playOnMount
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once, margin: "-10% 0px -10% 0px" },
      };
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Media reveal: a curtain opens bottom-to-top while the image inside settles
 * out of a slight over-scale. The two run at deliberately different lengths —
 * the mask finishes well before the scale does, so the picture is still moving
 * after it is fully visible. That lag is the whole effect, and it is what
 * separates "revealed" from "faded in".
 *
 * Use this instead of `<Reveal>` for photography. It replaces the media
 * wrapper too (it clips its own children), so it stands in for the old
 * `<Reveal><ParallaxMedia>` pairing at a call site.
 *
 * Only `clip-path` and `transform` animate, and only for the ~2s of the
 * reveal — there is no per-scroll-frame work, so this cannot reintroduce the
 * stutter that forced ParallaxMedia to be disabled.
 */
export function Curtain({
  children,
  className,
  delay = 0,
  once = true,
  playOnMount = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  playOnMount?: boolean;
}) {
  const reduced = useReducedMotion();

  // `MotionConfig reducedMotion="user"` drops transforms but would still
  // animate clip-path, so the opt-out has to be explicit here.
  if (reduced) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <div className="h-full w-full">{children}</div>
      </div>
    );
  }

  const trigger = playOnMount
    ? { animate: "show" as const }
    : {
        whileInView: "show" as const,
        viewport: { once, margin: "-10% 0px" },
      };

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: { clipPath: "inset(0% 0% 100% 0%)" },
        show: {
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 1.25, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      <motion.div
        className="h-full w-full"
        variants={{
          hidden: { scale: 1.16 },
          show: {
            scale: 1,
            transition: { duration: 1.9, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Mask-reveal: the child rises up from behind a clipped edge (no fade). Used for
 * the oversized hero wordmark. Each instance masks its own line.
 *
 * `play` takes manual control of the trigger, for the one case that needs it:
 * the home wordmark has to wait for the intro curtain to lift rather than
 * animating on mount underneath it.
 */
export function Rise({
  children,
  className,
  delay = 0,
  duration = 1,
  playOnMount = false,
  play,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  playOnMount?: boolean;
  /** When provided, drives the animation directly and ignores the other triggers. */
  play?: boolean;
}) {
  const trigger =
    play !== undefined
      ? { animate: { y: play ? "0%" : "115%" } }
      : playOnMount
        ? { animate: { y: "0%" } }
        : {
            whileInView: { y: "0%" },
            viewport: { once: true, margin: "-10% 0px" },
          };
  return (
    <span className={cn("inline-block overflow-hidden align-bottom", className)}>
      <motion.span
        // Changing the key remounts the span when `play` flips, so motion runs
        // its mount animation (initial -> animate) instead of being asked to
        // re-target an `animate` value it has already settled on. Motion does
        // not reliably pick up that re-target here, and a remount is both the
        // fix and the same code path the uncontrolled `playOnMount` callers
        // already take. The key is constant when `play` is not supplied, so
        // those callers never remount.
        key={play === undefined ? "auto" : play ? "play" : "hold"}
        className="inline-block"
        initial={{ y: "115%" }}
        {...trigger}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const child: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Splits text into words (or characters) and staggers each into place. Use for
 * hero headlines and statement lines.
 */
export function SplitText({
  text,
  className,
  by = "word",
  stagger = 0.04,
  once = true,
  playOnMount = false,
}: {
  text: string;
  className?: string;
  by?: "word" | "char";
  stagger?: number;
  once?: boolean;
  playOnMount?: boolean;
}) {
  const tokens = by === "word" ? text.split(" ") : Array.from(text);
  const trigger = playOnMount
    ? { animate: "show" as const }
    : {
        whileInView: "show" as const,
        viewport: { once, margin: "-10% 0px" },
      };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      custom={stagger}
      initial="hidden"
      {...trigger}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span variants={child} className="inline-block">
            {token}
            {by === "word" && i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
