/**
 * Essential Recovery content. All copy VERBATIM from the source docs:
 *  - "Webiste write up.xlsx" → The Recovery zone, Sauna, Cold Plunge, Massage,
 *    Guidance (Contrast Therapy), Infrared sauna, Cold Plunge (detailed), First
 *    Timers (recovery).
 *  - "First Timers Write up.xlsx" → "YOUR FIRST RECOVERY SESSION" + "ESSENTIAL
 *    RECOVERY FAQ".
 * Protocols (sessions/week, minutes) are exactly as written. Do not paraphrase.
 */

export type RecoveryOffering = {
  key: "sauna" | "cold-plunge" | "massage";
  name: string;
  href: string;
  tagline: string;
  blurb: string;
};

export const recovery = {
  eyebrow: "Essential Recovery",
  signature: "Move between heat, cold, and manual therapy.",

  // Opening statement — closes on a glowing line (like RUSH's "This is RUSH.").
  intro: {
    lines: [
      "Recovery at Grit is not separate from training—it is part of the system that helps you perform better, recover faster, and stay consistent.",
      "Our recovery services are designed to support training load, reduce muscle soreness, improve movement quality, and help you return to training ready.",
      "Recovery is not relaxation alone. It is preparation for your next session.",
    ],
    closer: "RESET. RESTORE. REPEAT.",
  },

  // "How it works" — the four recovery experiences.
  howItWorks: {
    eyebrow: "How it works",
    heading: "Four Experiences, One Outcome",
  },
  experiences: [
    {
      name: "Sauna",
      tagline: "Step into heat. Relax deeper. Let tension melt away.",
      href: "/recovery/sauna",
    },
    {
      name: "Cold Plunge",
      tagline: "Step into cold. Shock the system. Leave switched on.",
      href: "/recovery/cold-plunge",
    },
    {
      name: "Contrast Therapy",
      tagline: "Move between heat and cold. Discover calm in the extremes.",
      href: "/recovery/contrast",
    },
    {
      name: "Manual Therapy",
      tagline: "Hands-on recovery. Release tension. Restore how you move.",
      href: "/recovery/massage",
    },
  ],

  // Closing CTA. "carry" line ends in a "See what to carry" link to the FAQ.
  cta: {
    eyebrow: "Your journey starts here.",
    heading: "Recovery is training.",
    body: "Arrive 10 minutes early. Our team will guide you through the process and recommended exposure times.",
    carry:
      "To help you prepare for your first visit, we’ve outlined everything you need to bring.",
    carryLink: "See what to carry",
  },
  faqNote: "Still unsure?",

  contrast: {
    eyebrow: "Contrast Therapy",
    lines: [
      "Heat. Cold. Repeat.",
      "Move between infrared heat and cold immersion—two extremes, one purpose.",
      "Designed to support physical recovery, improve circulation responses, and build mental resilience through controlled exposure to stress.",
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
        "Our infrared sauna uses deep, soothing heat to help relax muscles, recharge your body, and get you ready for what’s next.",
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
        "Our appointment-based massage room is designed to support muscle recovery, reduce tension, and help you move and feel better between training sessions.",
    },
  ] as RecoveryOffering[],

  // "YOUR FIRST RECOVERY SESSION" — concise (First Timers doc, sheet 1)
  firstSession: {
    intro: "Recovery is training.",
    lead: "For sauna, cold plunge, or contrast therapy sessions, arrive 10 minutes early and bring:",
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
      "Keep it simple—show up as you are. Our coaches will guide you through the experience so you can move through it safely, confidently, and leave feeling clear, energized, and reset.",
      "Please arrive at the club at least 10 minutes before your session. Check in at the front desk, then head to The Recovery Zone. You’re welcome to use the locker room, fill your water bottle, and gather what you need before entering.",
    ],
  },

  faqs: [
    {
      q: "Do I need experience?",
      a: ["No.", "Recovery is for everyone. You’ll be guided throughout."],
    },
    {
      q: "What should I bring?",
      a: ["Swimwear or athletic wear, towel, water bottle, and dry clothes."],
    },
    {
      q: "How long should I stay in sauna or cold plunge?",
      a: [
        "We guide first-timers on safe exposure times based on your experience level.",
      ],
    },
    {
      q: "Do I need to do both sauna and cold plunge?",
      a: ["No.", "Heat, cold, or both—based on your recovery needs."],
    },
    {
      q: "What are the benefits?",
      a: [
        "Recovery supports muscle repair, reduces fatigue, improves circulation, and helps long-term training consistency.",
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
    "Consistent use is linked in studies with improvements across several health markers, including cardiovascular function, exercise recovery, metabolic response, and aspects of mental well-being.",
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
    "Research suggests regular cold exposure may be associated with improved stress tolerance, enhanced alertness, better sleep quality, and short-term increases in catecholamines linked to focus and energy. It may also contribute to metabolic activation through thermogenic response.",
    "Discomfort is expected—shivering is part of the adaptation process.",
  ],
  protocolLabel: "Recommended use",
  protocol:
    "2–3 sessions per week, 2–3 minutes per session (do not exceed ~3 minutes per exposure).",
};

export const manualTherapy = {
  eyebrow: "Essential Recovery · Manual Therapy",
  name: "Manual Therapy",
  lead: "Hands-on massage-based recovery designed to release tension, restore movement, and bring the body back to a state where training feels easier, smoother, and more controlled.",

  services: [
    {
      name: "Sports Massage",
      tagline: "Recover Better. Train Harder.",
      paras: [
        "A performance recovery session designed to reduce muscle soreness, support fatigue management, and improve how your body feels after training.",
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
        "This session targets specific areas that feel stiff, overworked, or restricted.",
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
        "A hybrid recovery session combining manual therapy, assisted stretching, and mobility work.",
        "Designed to improve flexibility, restore movement quality, and help you train with better control.",
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
    intro: "Recovery is most effective when matched to training load:",
    matches: [
      { when: "Trained hard", then: "Sports Massage" },
      { when: "One area always tight", then: "Deep Tissue Massage" },
      { when: "Movement feels restricted", then: "Mobility Reset" },
    ],
    guide:
      "Our coaches and therapists will guide you to the right option based on your training and recovery needs.",
  },

  note: "Recovery services are not a replacement for training, sleep, nutrition, or programming. They are a support system designed to help you train more consistently and effectively over time.",
};
