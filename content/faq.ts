/**
 * FAQ page content. VERBATIM new FAQ arrays for the /faq page.
 * Personal Training, Strength Club, and Recovery FAQs are NOT duplicated here —
 * the page imports them from content/training, content/strength, content/recovery.
 */

import type { Faq } from "@/components/sections/faq-accordion";

// STARTERS (FIRST TIMERS)
export const startersFaqs: Faq[] = [
  {
    q: "Do I need to be fit before I start?",
    a: ["No.", "Fitness is built through training. Not required before it."],
  },
  {
    q: "I'm new. Where do I start?",
    a: [
      "Start with an assessment.",
      "We guide you into the right pathway from there.",
    ],
  },
  {
    q: "What happens in the first session?",
    a: [
      "You begin with a comprehensive assessment covering your goals, movement, and training history.",
      "You meet a coach, discuss your direction, and get introduced to your training environment.",
    ],
  },
  {
    q: "What if I haven't trained in a long time?",
    a: ["Perfect.", "We rebuild from your current starting point step by step."],
  },
  {
    q: "Can I try different classes first?",
    a: [
      "Yes.",
      "We help you explore and then guide you toward what suits you best.",
      "Still unsure? Reach out to our team.",
    ],
  },
];

// RUSH CLASS
export const rushFaqs: Faq[] = [
  {
    q: "What is RUSH?",
    a: [
      "RUSH is our signature training system at Grit.",
      "It combines every training model—strength, hybrid, endurance, skill work, and movement flow—into one structured performance method.",
    ],
  },
  {
    q: "Is RUSH suitable for beginners?",
    a: [
      "Yes.",
      "Every session can be scaled to your level. You don't need experience to start.",
    ],
  },
  {
    q: "What should I expect?",
    a: [
      "Structure, intensity, and coaching.",
      "You'll move through strength and conditioning blocks designed to improve performance safely.",
    ],
  },
  {
    q: "Will I be able to keep up?",
    a: [
      "You don't need to.",
      "You train at your level. Progress matters more than comparison.",
    ],
  },
  {
    q: "How often should I do RUSH?",
    a: [
      "2–3 sessions per week is a strong starting point.",
      "Consistency first. Volume later.",
    ],
  },
];

// GENERAL
export const generalFaqs: Faq[] = [
  {
    q: "What makes Grit different?",
    a: [
      "Everything is coached, structured, and intentional.",
      "You don't just train—you train with purpose.",
      "Everyone trains like an athlete here.",
    ],
  },
  {
    q: "Can I combine classes, Strength Club, and PT?",
    a: [
      "Yes.",
      "Most members use a combination. We help structure it properly.",
    ],
  },
  {
    q: "Do I need a membership before trying?",
    a: [
      "You'll start with an assessment first. We guide you into the right option from there.",
    ],
  },
  {
    q: "What if I miss sessions?",
    a: [
      "Progress is built over time. One missed session doesn't matter. Consistency does.",
    ],
  },
  {
    q: "Who is Grit for?",
    a: [
      "Anyone willing to train with intent and show up consistently.",
      "Still unsure? Reach out to our team.",
    ],
  },
];
