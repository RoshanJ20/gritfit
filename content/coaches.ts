/**
 * Coach + leadership profiles.
 *
 * Source: "Coaches write up for website as of 21-08-2026.xlsx" (Sheet1 = full
 * field set, Sheet2 = the roster, which adds the directors). Every column from
 * that sheet has a key below, including the ones the sheet still leaves blank —
 * the leadership profiles. Those are empty strings, NOT invented copy: the card
 * renders a marked placeholder for any empty field, so the page doubles as a
 * checklist of what's outstanding.
 *
 * To publish a profile, fill the strings in. No component changes needed —
 * cards decide what to render (and whether they flip at all) from the data.
 */

export type Coach = {
  /** URL/key-safe id. */
  slug: string;
  /** Column A — Name. */
  name: string;
  /** Column B — Role. Pipes in the sheet become " / " for display. */
  role: string;
  /** Column C — One-Line Identity Statement. */
  identity: string;
  /** Column D — Coaching Philosophy. */
  philosophy: string;
  /** Column E — Areas of Expertise, pre-split on the sheet's "•" separator. */
  expertise: string[];
  /** Column F — Coaching Style. */
  style: string;
  /** Column G — The Grit Question: Why I Coach. */
  why: string;
  /** Portrait, e.g. "/images/team/roshan.jpg". Undefined → branded placeholder. */
  image?: string;
};

/** The back of a card only exists once at least one of these carries content. */
export function hasBackContent(c: Coach): boolean {
  return Boolean(
    c.identity || c.philosophy || c.style || c.why || c.expertise.length,
  );
}

/**
 * Leadership. Rendered beneath the coaches on /training/coaches — a member
 * meets who they train with first. Array order is the display order, set by
 * the club: Abhishek, then Taarika, then Bharath.
 */
export const leadership: Coach[] = [
  {
    slug: "abhishek-raju",
    name: "Abhishek Raju",
    role: "Director",
    identity: "",
    philosophy: "",
    expertise: [],
    style: "",
    why: "",
  },
  {
    slug: "taarika-abhishek",
    name: "Taarika Abhishek",
    role: "Director",
    identity: "",
    philosophy: "",
    expertise: [],
    style: "",
    why: "",
  },
  {
    slug: "bharath",
    name: "Bharath",
    role: "CEO",
    identity: "",
    philosophy: "",
    expertise: [],
    style: "",
    why: "",
  },
];

/** Coaching staff, alphabetical — the order the sheet uses. */
export const coaches: Coach[] = [
  {
    slug: "akilesh",
    name: "Akilesh",
    role: "Yoga Coach",
    identity: "Building resilient humans through conscious movement.",
    philosophy:
      "Awareness before action. Quality before quantity. Consistency over intensity.",
    expertise: [
      "Mobility",
      "Flexibility",
      "Breathwork",
      "Body Awareness",
      "Recovery Practices",
    ],
    style: "Adaptive & Individualised",
    why: "Because true strength begins with awareness of the body, breath and mind.",
  },
  {
    slug: "anjali",
    name: "Anjali",
    role: "Performance Nutrition Coach / Fitness Consultant",
    identity: "Making mindful training a way of life.",
    philosophy: "Take one step at a time. Never take a step back.",
    expertise: [
      "Sports Nutrition",
      "Habit Building",
      "Body Composition",
      "Performance Fueling",
      "Lifestyle Nutrition",
    ],
    style: "Encouraging & Supportive",
    why: "Because people deserve facts over myths and a smarter way to become healthier.",
  },
  {
    slug: "hemanth",
    name: "Hemanth",
    role: "Movement Coach / Calisthenics Specialist",
    identity: "Listen. Empathize. Analyze. Solve.",
    philosophy:
      "Help people break through the limitations of their mind and body.",
    expertise: [
      "Movement Quality",
      "Movement Control",
      "Joint Health",
      "Corrective Training",
      "Injury Prevention",
      "Advanced Calisthenics",
    ],
    style: "Precision & Detail-Oriented",
    why: "Because I love helping people help themselves.",
  },
  {
    slug: "krishna",
    name: "Krishna",
    role: "Calisthenics Coach / Content Creator",
    identity: "Build strength. Build discipline. Build a better you.",
    philosophy: "Show up. Do the work. Get better every single day.",
    expertise: ["Bodyweight Strength", "Skill Development", "Relative Strength"],
    style: "High-Energy & Motivational",
    why: "Because I want people to discover that they’re capable of far more than they believe.",
  },
  {
    slug: "praphul",
    name: "Praphul",
    role: "Performance Coach / Combat Specialist",
    identity: "Building people strong enough for whatever life throws at them.",
    philosophy:
      "Build versatility, resilience and capability beyond the ordinary.",
    expertise: [
      "Speed",
      "Power",
      "Conditioning",
      "Combat Performance",
      "Boxing",
      "MMA",
      "Striking Fundamentals",
    ],
    style: "Performance Driven",
    why: "Because everyone is capable of more, and I want to help them discover it.",
  },
  {
    slug: "roshan",
    name: "Roshan",
    role: "Hypertrophy Coach",
    identity: "Beyond fitness. Build physical capability.",
    philosophy:
      "Build a strong foundation. Pursue performance. Prioritize lasting progress.",
    expertise: [
      "Muscle Development",
      "Strength Progression",
      "Resistance Training",
      "Body Composition",
      "Progressive Overload",
    ],
    style: "Intensity-Focused",
    why: "Because physical capability changes the way you experience life.",
  },
];
