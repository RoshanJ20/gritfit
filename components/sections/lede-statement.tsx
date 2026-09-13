import { Fragment } from "react";

import { Reveal } from "@/components/motion/reveal";

/**
 * The lead statement block shared by RUSH, Training and Essential Recovery —
 * one container of `.lede` paragraphs that closes on a shiny line (the closer
 * stays with each page).
 *
 * Each string in `lines` is its own paragraph, separated by the parent's
 * `space-y-*` gap. A "\n" inside a string breaks the line WITHOUT that gap, so a
 * punchy summary ("Every class has a purpose…") can sit on its own line, tighter
 * than a paragraph break.
 */
export function LedeStatement({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <p className="lede">
            {line.split("\n").map((segment, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {segment}
              </Fragment>
            ))}
          </p>
        </Reveal>
      ))}
    </>
  );
}
