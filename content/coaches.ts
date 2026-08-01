/**
 * Coach + leadership profiles.
 *
 * Source: "Coaches write up for website.xlsx" (Sheet1 = full field set,
 * Sheet2 = the roster, which adds Taarika). Every column from that sheet has a
 * key below, including the ones the sheet leaves blank today — One-Line
 * Identity Statement, Coaching Philosophy, and The Grit Question. Those are
 * empty strings, NOT invented copy: the card renders a marked placeholder for
 * any empty field, so the page doubles as a checklist of what's outstanding.
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

/** Leadership — listed first on the page. */
export const leadership: Coach[] = [
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
];

/** Coaching staff, alphabetical — the order the sheet uses. */
export const coaches: Coach[] = [
  {
    slug: "akilesh",
    name: "Akilesh",
    role: "Yoga Coach",
    identity: "",
    philosophy: "",
    expertise: [
      "Mobility",
      "Flexibility",
      "Breathwork",
      "Body Awareness",
      "Recovery Practices",
    ],
    style: "Adaptive & Individualised",
    why: "",
  },
  {
    slug: "anjali",
    name: "Anjali",
    role: "Performance Nutrition Coach / Fitness Consultant",
    identity: "",
    philosophy: "",
    expertise: [
      "Sports Nutrition",
      "Habit Building",
      "Body Composition",
      "Performance Fueling",
      "Lifestyle Nutrition",
    ],
    style: "Encouraging & Supportive",
    why: "",
  },
  {
    slug: "hemanth",
    name: "Hemanth",
    role: "Movement Coach / Calisthenics Specialist",
    identity: "",
    philosophy: "",
    expertise: [
      "Movement Quality",
      "Movement Control",
      "Joint Health",
      "Corrective Training",
      "Injury Prevention",
      "Advanced Calisthenics",
    ],
    style: "Precision & Detail-Oriented",
    why: "",
  },
  {
    slug: "krishna",
    name: "Krishna",
    role: "Calisthenics Coach / Content Creator",
    identity: "",
    philosophy: "",
    expertise: ["Bodyweight Strength", "Skill Development", "Relative Strength"],
    // Sheet leaves Coaching Style blank for Krishna.
    style: "",
    why: "",
  },
  {
    slug: "praphul",
    name: "Praphul",
    role: "Performance Coach / Combat Specialist",
    identity: "",
    philosophy: "",
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
    why: "",
  },
  {
    slug: "roshan",
    name: "Roshan",
    role: "Hypertrophy Coach",
    identity: "",
    philosophy: "",
    expertise: [
      "Muscle Development",
      "Strength Progression",
      "Resistance Training",
      "Body Composition",
      "Progressive Overload",
    ],
    style: "Intensity-Focused",
    why: "",
  },
];
