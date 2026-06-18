/**
 * Membership tiers. Feature bullets are VERBATIM from source. Prices are NOT
 * known — the UI renders a Placeholder, never an invented number.
 */

export type MembershipTier = {
  name: string;
  /** Short positioning line shown under the tier name. */
  tagline: string;
  /** Marks the recommended tier ("Most Chosen"). */
  highlight?: boolean;
  features: string[];
};

// The shared note rendered once below the grid (was previously duplicated as a
// feature bullet on every tier).
export const membershipNote = "All memberships must be purchased at the club.";

export const membershipTiers: MembershipTier[] = [
  {
    name: "Open Gym",
    tagline: "Start where you are",
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
    features: [
      "Unlimited access to both Classes and Strength Club during operating hours, as well as club amenities, including sauna & cold plunge access based on selected membership duration",
      "First class complimentary with required assessment prior to participation",
      "Personal trainer guidance included during membership",
      "Nutrition counselling included as part of the membership",
    ],
  },
];
