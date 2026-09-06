import { Fragment } from "react";
import { ShinyText } from "@/components/reactbits/shiny-text";

/**
 * Phrases that carry the green sweep wherever they appear in body copy.
 * Each entry must match the source copy in `content/` VERBATIM — matching is
 * literal, so a phrase that no longer exists simply renders plain.
 * Keep this list short: green is punctuation, not a paragraph.
 */
export const SHINE_PHRASES = [
  // Homepage — Why Grit Fit
  "More strength. More control. More capacity. More capability.",
  "Strength, Conditioning, Calisthenics, Combat, Yoga, Movement, Recovery and Nutrition",
  "GritFit isn\u2019t about doing more things. It\u2019s about becoming more capable.",
  // RUSH — Peak
  "simple, brutal, effective",
  "Build capacity. Stay composed. Go further.",
  "stronger, move better and stay resilient",
  "Structured. Challenging. Progressive.",
  "Train with intent. Build strength that lasts.",
  "power, capacity and control under fatigue.",
  "Strong. Fast. Unstoppable.",
  // RUSH — Flow
  "movement, stillness and awareness.",
  "Leave grounded. Feel open. Mind clear.",
  "lengthen the body, build internal heat and find balance in motion.",
  "Expect to sweat.",
  "flexibility, balance and body awareness.",
  "Release tension. Restore balance. Move better, longer.",
  // RUSH — Skillab
  "skill, intensity and precision under pressure.",
  "Leave sharper, stronger and more confident in how you move and carry yourself.",
  "from beginners building foundations to advanced athletes refining performance.",
  "form, technique and movement fundamentals",
  "Expect learning and detail. Leave moving better, lifting with confidence and built on strong fundamentals.",
  "stronger, more resilient tissue and better movement quality.",
  "Expect control, time under tension and deep soreness. Leave feeling stronger, more athletic and moving with ease.",
  "pushing, pulling, core and stability strength that carries directly into bodyweight performance.",
  "Expect focused work, progressive overload and purposeful training.",
  "speed, resilience and control under fatigue.",
  "Expect intensity, focus and high output. Leave stronger, faster and built for performance.",
  "We train pace. We build endurance.",
  "Run smarter. Run stronger. Run together.",
  "awareness, resilience and respect.",
  "Train with purpose. Move with confidence. Grow stronger every day.",
];

// Longest first, so a phrase never gets cut short by a shorter overlapping one.
const ORDERED = [...SHINE_PHRASES].sort((a, b) => b.length - a.length);

/**
 * Splits a paragraph around any phrase in SHINE_PHRASES and wraps each hit in
 * a single ShinyText, so the sweep travels across the whole phrase as one.
 * Returns the plain string when nothing matches.
 */
export function withShine(text: string) {
  const hits: { at: number; phrase: string }[] = [];
  for (const phrase of ORDERED) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(phrase, from);
      if (at === -1) break;
      const end = at + phrase.length;
      // Skip anything overlapping a longer phrase already claimed.
      if (!hits.some((h) => at < h.at + h.phrase.length && h.at < end)) {
        hits.push({ at, phrase });
      }
      from = at + 1;
    }
  }
  if (hits.length === 0) return text;
  hits.sort((a, b) => a.at - b.at);

  const out: React.ReactNode[] = [];
  let cursor = 0;
  hits.forEach((h, i) => {
    if (h.at > cursor) out.push(text.slice(cursor, h.at));
    out.push(
      <ShinyText key={i} speed={5}>
        {h.phrase}
      </ShinyText>,
    );
    cursor = h.at + h.phrase.length;
  });
  if (cursor < text.length) out.push(text.slice(cursor));
  return <Fragment>{out}</Fragment>;
}
