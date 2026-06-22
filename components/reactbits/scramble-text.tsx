"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/";

/**
 * Decrypt-in text: when the element scrolls into view the string briefly
 * scrambles through random glyphs, then locks into place left-to-right.
 * Restyled-in-spirit from ReactBits' DecryptedText. The real string is the
 * server-rendered content and the accessible label, so no-JS and screen
 * readers always get clean text; reduced motion skips the scramble entirely.
 */
export function ScrambleText({
  text,
  className,
  speed = 38,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduced || !inView) return;
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 2);
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            ch === " "
              ? " "
              : i < revealed
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (revealed >= total) {
        clearInterval(id);
        setDisplay(text);
      }
    }, speed);
    return () => clearInterval(id);
  }, [inView, reduced, text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
