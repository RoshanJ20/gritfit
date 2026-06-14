/**
 * Membership tiers. Feature bullets are VERBATIM from source. Prices are NOT
 * known — the UI renders a Placeholder, never an invented number.
 */

export type MembershipTier = {
  name: string;
  features: string[];
};

export const membershipTiers: MembershipTier[] = [
  {
    name: "Open Gym",
    features: [
      "Access to the club during operating hours, as well as club amenities",
      "Choice of membership option: Classes or Strength Club",
      "First class complimentary with required assessment prior to participation",
      "One complimentary class with personal trainer guidance included during membership",
      "Nutrition counselling included as part of the membership",
      "All memberships must be purchased at the club",
    ],
  },
  {
    name: "Platinum",
    features: [
      "Unlimited access to both Classes and Strength Club during operating hours, as well as club amenities",
      "First class complimentary with required assessment prior to participation",
      "One complimentary class with personal trainer guidance included during membership",
      "Nutrition counselling included as part of the membership",
      "All memberships must be purchased at the club",
    ],
  },
  {
    name: "VIP",
    features: [
      "Unlimited access to both Classes and Strength Club during operating hours, as well as club amenities, including sauna & cold plunge access based on selected membership duration",
      "First class complimentary with required assessment prior to participation",
      "Personal trainer guidance included during membership",
      "Nutrition counselling included as part of the membership",
      "All memberships must be purchased at the club",
    ],
  },
];
