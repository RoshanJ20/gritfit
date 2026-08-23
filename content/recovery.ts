/**
 * Essential Recovery content. All copy VERBATIM from the source docs:
 *  - "Webiste write up.xlsx" → The Recovery zone, Sauna, Cold Plunge, Massage,
 *    Guidance (Contrast Therapy), Infrared sauna, Cold Plunge (detailed), First
 *    Timers (recovery).
 *  - "First Timers Write up.xlsx" → "YOUR FIRST RECOVERY SESSION" + "ESSENTIAL
 *    RECOVERY FAQ".
 * Protocols (sessions/week, minutes) are exactly as written. Do not paraphrase.
 */

import type { ClassFormat } from "@/content/rush";

export type RecoveryOffering = {
  key: "sauna" | "cold-plunge" | "massage";
  name: string;
  href: string;
  tagline: string;
  blurb: string;
};

export const recovery = {
  eyebrow: "Essential Recovery",
  signature: "Where recovery hits different",
  subtitle: "Move between heat, cold and manual therapy.",

  // Opening statement — closes on a glowing line (like RUSH's "This is RUSH.").
  intro: {
    lines: [
      "Recovery at Grit Fit is not separate from training—it is part of the system that helps you perform better, recover faster and stay consistent.",
      "Our recovery services are designed to support training load, reduce muscle soreness, improve movement quality and help you return to training ready.",
      "Recovery is not relaxation alone. It is preparation for your next session.",
    ],
    closer: "RESET. RESTORE. REPEAT.",
  },

  // "How it works" — the four recovery experiences.
  howItWorks: {
    eyebrow: "How it works",
    heading: "Two Experiences, One Outcome",
  },
  experiences: [
    {
      name: "Exposure Therapy",
      tagline: "Sauna, cold plunge and contrast therapy.",
      href: "/recovery/exposure",
    },
    {
      name: "Manual Therapy",
      tagline: "Hands-on recovery. Release tension. Restore how you move.",
      href: "/recovery/massage",
    },
  ],

  // Closing CTA — shared by every Essential Recovery page via `RecoveryClose`.
  cta: {
    eyebrow: "Your journey starts here.",
    heading: "Recovery is training.",
    body: "Arrive 10 minutes early. Our team will guide you through the process and recommended exposure times.",
    carry:
      "To help you prepare for your first visit, we’ve outlined everything you need to bring.",
  },

  // Headings for the "what to carry" section on the hub. The list itself is
  // `firstSession` below.
  whatToCarry: {
    eyebrow: "Before your first visit",
    heading: "What to carry",
  },

  // Packages & pricing band, shared by every Essential Recovery page via
  // `RecoveryClose`. Pricing is enquiry-only, so this points to where the
  // numbers live rather than listing them.
  packages: {
    eyebrow: "Packages & Pricing",
    heading: "Packages & pricing at the club",
    body: "Recovery is available as single sessions and as session packs. Our team will walk you through the options and current pricing — just ask.",
    cta: "Enquire about pricing",
  },
  faqNote: "Still unsure?",

  /**
   * Shared closing note. Rendered by `RecoveryClose` on every Essential
   * Recovery page (hub, Exposure Therapy, Manual Therapy) so the three read
   * identically at the bottom.
   */
  note: "Recovery services are not a replacement for training, sleep, nutrition or programming. They are a support system designed to help you train more consistently and effectively over time.",

  contrast: {
    eyebrow: "Contrast Therapy",
    lines: [
      "Heat. Cold. Repeat.",
      "Move between infrared heat and cold immersion—two extremes, one purpose.",
      "Designed to support physical recovery, improve circulation responses and build mental resilience through controlled exposure to stress.",
    ],
    question: "What changes when you learn to stay calm in the extremes?",
  },

  offerings: [
    {
      key: "sauna",
      name: "Infrared Sauna",
      href: "/recovery/sauna",
      tagline: "Built for recovery. Designed to reset.",
      blurb:
        "Our infrared sauna uses deep, soothing heat to help relax muscles, recharge your body and get you ready for what’s next.",
    },
    {
      key: "cold-plunge",
      name: "Cold Plunge",
      href: "/recovery/cold-plunge",
      tagline: "Cool down with purpose.",
      blurb:
        "Our cold plunge is designed to support recovery by helping reduce post-workout muscle soreness and bringing your body back to baseline after intense training.",
    },
    {
      key: "massage",
      name: "Massage",
      href: "/recovery/massage",
      tagline: "Recover with intention.",
      blurb:
        "Our appointment-based massage room is designed to support muscle recovery, reduce tension and help you move and feel better between training sessions.",
    },
  ] as RecoveryOffering[],

  // "YOUR FIRST RECOVERY SESSION" — concise (First Timers doc, sheet 1)
  firstSession: {
    intro: "Recovery is training.",
    lead: "For sauna, cold plunge or contrast therapy sessions, arrive 10 minutes early and bring:",
    bring: [
      "Appropriate swimwear or athletic attire",
      "A towel",
      "Water bottle",
      "Dry clothes for after your session",
    ],
    note: "Our team will guide you through the process and recommended exposure times.",
    closer: "Heat. Cold. Reset.",
  },

  // Detailed first-timers guidance (Website doc → First Timers, recovery)
  firstTimers: {
    wear: [
      "Appropriate swimwear or athletic shorts/sports bra",
      "Flip flops or slip-on shoes",
      "Dry change of clothes for after your session",
      "(Please avoid thongs or speedos)",
    ],
    bring: [
      "Water bottle (fill it before entering The Deep End)",
      "Large towel",
      "A playlist or hype song for your plunge",
      "An open mind",
    ],
    doText: [
      "Keep it simple—show up as you are. Our coaches will guide you through the experience so you can move through it safely, confidently and leave feeling clear, energized and reset.",
      "Please arrive at the club at least 10 minutes before your session. Check in at the front desk, then head to The Recovery Zone. You’re welcome to use the locker room, fill your water bottle and gather what you need before entering.",
    ],
  },

  faqs: [
    {
      q: "Do I need experience?",
      a: ["No.", "Recovery is for everyone. You’ll be guided throughout."],
    },
    {
      q: "What should I bring?",
      a: ["Swimwear or athletic wear, towel, water bottle and dry clothes."],
    },
    {
      q: "How long should I stay in sauna or cold plunge?",
      a: [
        "We guide first-timers on safe exposure times based on your experience level.",
      ],
    },
    {
      q: "Do I need to do both sauna and cold plunge?",
      a: ["No.", "Heat, cold or both—based on your recovery needs."],
    },
    {
      q: "What are the benefits?",
      a: [
        "Recovery supports muscle repair, reduces fatigue, improves circulation and helps long-term training consistency.",
      ],
    },
  ],
};

export const sauna = {
  name: "Infrared Sauna",
  intro: "Built for recovery. Designed to reset.",
  tagline: "Heat. Discipline. Adaptation.",
  paras: [
    "Regular sauna exposure places controlled thermal stress on the body, which research shows can stimulate heat shock proteins—molecular responses associated with cellular repair processes and inflammation regulation.",
    "Consistent use is linked in studies with improvements across several health markers, including cardiovascular function, exercise recovery, metabolic response and aspects of mental well-being.",
    "You don’t avoid discomfort—you work through it. Elevated heart rate, heavy sweat, steady breathing.",
  ],
  protocolLabel: "Recommended use",
  protocol:
    "~2–3 sessions per week, 10–15 minutes per session (do not exceed ~20 minutes per session).",
};

export const coldPlunge = {
  name: "Cold Plunge",
  intro: "Cool down with purpose.",
  tagline: "Cold Exposure",
  paras: [
    "Deliberate Cold Exposure (DCE) is the intentional practice of exposing the body to cold through methods like cold plunging or cold showers. It is used as a controlled stressor the body adapts to over time.",
    "Research suggests regular cold exposure may be associated with improved stress tolerance, enhanced alertness, better sleep quality and short-term increases in catecholamines linked to focus and energy. It may also contribute to metabolic activation through thermogenic response.",
    "Discomfort is expected—shivering is part of the adaptation process.",
  ],
  protocolLabel: "Recommended use",
  protocol:
    "2–3 sessions per week, 2–3 minutes per session (do not exceed ~3 minutes per exposure).",
};

export const manualTherapy = {
  eyebrow: "Essential Recovery · Manual Therapy",
  name: "Manual Therapy",
  lead: "Hands-on massage-based recovery designed to release tension, restore movement and bring the body back to a state where training feels easier, smoother and more controlled.",

  services: [
    {
      name: "Sports Massage",
      tagline: "Recover Better. Train Harder.",
      paras: [
        "A performance recovery session designed to reduce muscle soreness, support fatigue management and improve how your body feels after training.",
        "Built for people who train regularly and want to stay consistent without breakdown.",
      ],
      benefits: [
        "Reduces post-training soreness",
        "Supports recovery between sessions",
        "Helps manage training fatigue",
        "Improves readiness for next workout",
      ],
      bestFor: "Athletes, lifters, runners, HYROX, CrossFit, active members",
    },
    {
      name: "Deep Tissue Massage",
      tagline: "Release Tightness. Restore Movement.",
      paras: [
        "A focused treatment for persistent muscle tightness and discomfort that affects training and daily movement.",
        "This session targets specific areas that feel stiff, overworked or restricted.",
      ],
      benefits: [
        "Targets chronic tight areas",
        "Reduces muscle tension sensation",
        "Improves movement comfort",
        "Supports better training mechanics",
      ],
      bestFor: "Neck, shoulders, back, hips, calves, recurring tightness",
    },
    {
      name: "Mobility Reset",
      tagline: "Move Better. Perform Better.",
      paras: [
        "A hybrid recovery session combining manual therapy, assisted stretching and mobility work.",
        "Designed to improve flexibility, restore movement quality and help you train with better control.",
      ],
      benefits: [
        "Improves range of motion",
        "Enhances movement quality",
        "Reduces stiffness from training or sitting",
        "Supports better lifting and athletic performance",
      ],
      bestFor: "Stiffness, mobility restrictions, desk workers, movement limitations",
    },
  ],

  howToUse: {
    eyebrow: "How to use recovery services",
    heading: "Match recovery to your training load.",
    intro:
      "Recovery is most effective when matched to training load. Find the line that sounds like your week, and start with the session beside it:",
    // Symptom → recommended session. `when` is phrased as something a member
    // would actually say about their body, so the pairing reads as advice
    // rather than two unrelated columns.
    matches: [
      { when: "You've trained hard this week", then: "Sports Massage" },
      {
        when: "One area stays tight, session after session",
        then: "Deep Tissue Massage",
      },
      { when: "Movement feels restricted or stiff", then: "Mobility Reset" },
    ],
    guide:
      "Our coaches and therapists will guide you to the right option based on your training and recovery needs.",
  },

  note: recovery.note,
};

/**
 * Manual Therapy sessions as alternating editorial rows (same `FormatList`
 * rhythm as Exposure Therapy). Unlike the verbatim source copy above, the
 * `paras` here are written for the wider two-column layout: each one folds the
 * session's benefits and "best for" audience into flowing prose. Format `name`s
 * are the keys used to look up imagery in the page's image map.
 */
export const massageFormats = [
  {
    name: "Sports Massage",
    tagline: manualTherapy.services[0].tagline,
    paras: [
      "A performance recovery session designed to reduce muscle soreness, support fatigue management and improve how your body feels after training.",
      "Built for people who train regularly and want to stay consistent without breakdown, it keeps post-training soreness in check, supports recovery between sessions and helps you manage the fatigue that accumulates across a training week.",
      "The result is a body that shows up ready for the next workout, session after session. Ideal for athletes, lifters, runners and HYROX or CrossFit members who train often.",
    ],
  },
  {
    name: "Deep Tissue Massage",
    tagline: manualTherapy.services[1].tagline,
    paras: [
      "A focused treatment for persistent muscle tightness and discomfort that affects both training and daily movement.",
      "This session works into the specific areas that feel stiff, overworked or restricted — releasing chronic tight spots and reducing the sensation of muscle tension so movement feels comfortable again.",
      "By freeing up the areas that hold you back, it supports cleaner training mechanics under load. Best for the neck, shoulders, back, hips and calves, and for any recurring tightness that won't let go.",
    ],
  },
  {
    name: "Mobility Reset",
    tagline: manualTherapy.services[2].tagline,
    paras: [
      "A hybrid recovery session that combines manual therapy, assisted stretching and mobility work in one focused block.",
      "Designed to improve flexibility, restore movement quality and help you train with better control, it opens up range of motion and reduces the stiffness that builds from hard training or long hours at a desk.",
      "The payoff is movement that feels free and controlled, supporting better lifting and athletic performance. Ideal if you're dealing with stiffness, mobility restrictions or the movement limitations of a sedentary day.",
    ],
  },
] as ClassFormat[];

/**
 * Exposure Therapy — the merged hub for the heat/cold modalities. Presents
 * Sauna, Cold Plunge, and Contrast Therapy as alternating editorial rows,
 * reusing the verbatim modality copy above. Format `name`s are the keys used to
 * look up imagery in `exposureFormatImages`.
 */
export const exposure = {
  eyebrow: "Essential Recovery · Exposure Therapy",
  name: "Exposure Therapy",
  lead: "Controlled exposure to heat and cold — sauna, cold plunge and contrast therapy, working the body between the extremes.",
  formats: [
    {
      name: "Sauna",
      tagline: sauna.tagline,
      paras: sauna.paras,
    },
    {
      name: "Cold Plunge",
      tagline: coldPlunge.tagline,
      paras: coldPlunge.paras,
    },
    {
      name: "Contrast Therapy",
      tagline: recovery.contrast.lines[0],
      paras: recovery.contrast.lines.slice(1),
    },
  ] as ClassFormat[],
};
