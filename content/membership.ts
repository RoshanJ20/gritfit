/**
 * Membership tiers. Feature bullets are VERBATIM from source. Prices are NOT
 * known — the UI renders a Placeholder, never an invented number.
 */

/** Commitment lengths offered, in months. */
export type BillingDuration = 3 | 6 | 12;

export const membershipDurations: {
  months: BillingDuration;
  label: string;
}[] = [
  { months: 3, label: "3 months" },
  { months: 6, label: "6 months" },
  { months: 12, label: "12 months" },
];

/** Which duration the toggle starts on. */
export const defaultDuration: BillingDuration = 12;

export type MembershipTier = {
  name: string;
  /** Short positioning line shown under the tier name. */
  tagline: string;
  /**
   * One-line condensation of `features`, for the home page teaser — the full
   * bullet list lives on /membership, which the teaser links to.
   */
  summary: string;
  /** Marks the recommended tier ("Most Chosen"). */
  highlight?: boolean;
  /**
   * Price per commitment length. Values are unknown for now — leave a duration
   * out (or set undefined) to render the pricing placeholder. Fill in the real
   * strings later, e.g. `{ 3: "₹—", 6: "₹—", 12: "₹—" }`.
   */
  prices?: Partial<Record<BillingDuration, string>>;
  features: string[];
  /**
   * Exact feature string to visually emphasise — used to draw attention to the
   * Classes/Strength Club access on the plans where it matters most.
   */
  highlightFeature?: string;
  /** Small print tied to this tier (e.g. the Apex recovery asterisk). */
  footnote?: string;
  /**
   * What this tier does NOT include — short labels derived from the tiers above
   * it. Rendered muted beneath the feature list so the step up between plans is
   * legible at a glance (and so the shorter cards don't read as unfinished).
   */
  excluded?: string[];
  /**
   * Structured access breakdown, rendered as a cumulative "ladder" so the
   * choose-one-vs-both distinction is unmistakable:
   *  - filled: how many of the 3 access rungs are unlocked (training pillar →
   *    both pillars → + Essential Recovery).
   *  - pillars: "choose-one" (RUSH OR Strength Club) vs "both" (RUSH + SC).
   *  - recovery: whether the Essential Recovery is included.
   */
  access: {
    filled: 1 | 2 | 3;
    pillars: "choose-one" | "both";
    recovery: boolean;
  };
};

// The shared notes rendered once below the grid (the first was previously
// duplicated as a feature bullet on every tier). Kept as short label/body pairs
// so the page can lay them out as compact points rather than one wide banner.
export const membershipNotes = [
  {
    label: "Where to buy",
    body: "All memberships must be purchased at the club.",
  },
  {
    label: "Current offer",
    body: "For ongoing offers, contact the club directly.",
  },
];

export const membershipTiers: MembershipTier[] = [
  {
    name: "Core",
    tagline: "Choose your training path.",
    summary: "Unlimited RUSH classes or Strength Club — pick one.",
    // prices: { 3: "", 6: "", 12: "" },  ← fill in later
    prices: {},
    access: { filled: 1, pillars: "choose-one", recovery: false },
    highlightFeature: "Choose either Classes or Strength Club",
    features: [
      "Choose either Classes or Strength Club",
      "Access to the club and amenities during operating hours",
    ],
    excluded: [
      "Guided classes with a coach",
      "Nutrition consultation",
      "Essential Recovery access",
    ],
  },
  {
    name: "Elite",
    tagline: "Train without limits.",
    summary: "Unlimited RUSH classes + Strength Club — both included.",
    highlight: true,
    prices: {},
    access: { filled: 2, pillars: "both", recovery: false },
    highlightFeature: "Unlimited access to Classes + Strength Club",
    features: [
      "Unlimited access to Classes + Strength Club",
      "Full access to the club and amenities during operating hours",
      "One guided class with a coach",
      "Nutrition consultation included",
    ],
    excluded: ["Essential Recovery access"],
  },
  {
    name: "Apex",
    tagline: "The complete Grit Fit experience.",
    summary:
      "Unlimited RUSH classes + Strength Club + Essential Recovery — full access.",
    prices: {},
    access: { filled: 3, pillars: "both", recovery: true },
    highlightFeature:
      "Unlimited access to Classes + Strength Club + Essential Recovery*",
    footnote: "*Sauna & Cold Plunge access is based on membership duration.",
    features: [
      "Unlimited access to Classes + Strength Club + Essential Recovery*",
      "Full access to the club and amenities during operating hours",
      "Three guided classes with a coach",
      "Ongoing coaching and guidance throughout your membership",
      "Nutrition consultation included",
    ],
  },
];
