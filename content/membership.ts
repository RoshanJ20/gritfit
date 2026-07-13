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
export const defaultDuration: BillingDuration = 6;

export type MembershipTier = {
  name: string;
  /** Short positioning line shown under the tier name. */
  tagline: string;
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
  /**
   * Structured access breakdown, rendered as a cumulative "ladder" so the
   * choose-one-vs-both distinction is unmistakable:
   *  - filled: how many of the 3 access rungs are unlocked (training pillar →
   *    both pillars → + Recovery Zone).
   *  - pillars: "choose-one" (RUSH OR Strength Club) vs "both" (RUSH + SC).
   *  - recovery: whether the Recovery Zone is included.
   */
  access: {
    filled: 1 | 2 | 3;
    pillars: "choose-one" | "both";
    recovery: boolean;
  };
};

// The shared note rendered once below the grid (was previously duplicated as a
// feature bullet on every tier).
export const membershipNote = "All memberships must be purchased at the club.";

export const membershipTiers: MembershipTier[] = [
  {
    name: "Open Gym",
    tagline: "Start where you are",
    // prices: { 3: "", 6: "", 12: "" },  ← fill in later
    prices: {},
    access: { filled: 1, pillars: "choose-one", recovery: false },
    highlightFeature: "Choice of membership option: Classes or Strength Club",
    features: [
      "Access to the club during operating hours, as well as club amenities",
      "Choice of membership option: Classes or Strength Club",
      "First class complimentary with required assessment prior to participation",
      "One complimentary class with personal trainer guidance included during membership",
      "Nutrition counselling included as part of the membership",
    ],
  },
  {
    name: "Platinum",
    tagline: "The full experience",
    highlight: true,
    prices: {},
    access: { filled: 2, pillars: "both", recovery: false },
    highlightFeature:
      "Unlimited access to both Classes and Strength Club during operating hours, as well as club amenities",
    features: [
      "Unlimited access to both Classes and Strength Club during operating hours, as well as club amenities",
      "First class complimentary with required assessment prior to participation",
      "One complimentary class with personal trainer guidance included during membership",
      "Nutrition counselling included as part of the membership",
    ],
  },
  {
    name: "VIP",
    tagline: "Everything, uncapped",
    prices: {},
    access: { filled: 3, pillars: "both", recovery: true },
    features: [
      "Unlimited access to both Classes and Strength Club during operating hours, as well as club amenities, including sauna & cold plunge access based on selected membership duration",
      "First class complimentary with required assessment prior to participation",
      "Personal trainer guidance included during membership",
      "Nutrition counselling included as part of the membership",
    ],
  },
];
