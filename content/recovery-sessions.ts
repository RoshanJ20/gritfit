/**
 * Recovery session packs. Session-based pricing for the Recovery Zone — no
 * long-term commitment. Prices are NOT known: the UI renders a Placeholder,
 * never an invented number. Feature copy describes the guided Exposure Therapy
 * experience already documented in `content/recovery.ts`.
 */

export type SessionPack = {
  /** Number of sessions in the pack. */
  sessions: 1 | 4 | 8 | 12;
  name: string;
  /** Marks the recommended pack ("Best Value"). */
  highlight?: boolean;
  /**
   * Price per pack. Unknown for now — leave undefined to render the pricing
   * placeholder. Fill in the real string later, e.g. "₹—".
   */
  price?: string;
  features: string[];
};

// Shared note rendered once below the grid.
export const sessionsNote =
  "Session packs and their validity are confirmed at the club.";

export const sessionPacks: SessionPack[] = [
  {
    sessions: 1,
    name: "Single Session",
    features: [
      "One guided Recovery Zone session",
      "Access to Exposure Therapy — sauna, cold plunge, and contrast therapy",
      "Coach guidance on recommended exposure times",
    ],
  },
  {
    sessions: 4,
    name: "4 Sessions",
    features: [
      "Four guided Recovery Zone sessions",
      "Access to Exposure Therapy — sauna, cold plunge, and contrast therapy",
      "Coach guidance on recommended exposure times",
    ],
  },
  {
    sessions: 8,
    name: "8 Sessions",
    highlight: true,
    features: [
      "Eight guided Recovery Zone sessions",
      "Access to Exposure Therapy — sauna, cold plunge, and contrast therapy",
      "Coach guidance on recommended exposure times",
    ],
  },
  {
    sessions: 12,
    name: "12 Sessions",
    features: [
      "Twelve guided Recovery Zone sessions",
      "Access to Exposure Therapy — sauna, cold plunge, and contrast therapy",
      "Coach guidance on recommended exposure times",
    ],
  },
];
