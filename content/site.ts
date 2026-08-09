/**
 * Site-wide brand facts. Verbatim from "Webiste write up.xlsx" where a source
 * value exists. Fields the source marks "yet to work on" are flagged
 * `placeholder: true` so the UI can render them as clearly-unconfirmed.
 */

export type MaybePlaceholder = {
  value: string;
  placeholder: boolean;
};

export const site = {
  name: "Grit Fit",
  fullName: "Grit Fit — The Luxe Club",
  // Signature line — source: "Lift. Run. Fight. Fly.Stretch. Recover. And more."
  signatureLine: "Lift. Run. Fight. Fly. Stretch. Recover. Strike.",
  signatureWords: [
    "Lift",
    "Run",
    "Fight",
    "Fly",
    "Stretch",
    "Recover",
    "Strike",
  ],
  philosophy: [
    "Grit club is home where nothing is given, everything is earned through hard work.",
    "Built on a passion for strength, movement, and mindset.",
    "A training experience that meets you where you are, pushes you forward, and leaves you better every time.",
  ],
  // Source: "We've built a full training space where everything sits under one roof…"
  usp: {
    heading: "One roof. Every discipline.",
    body: [
      "GRIT exists for those who want more from themselves—more discipline, more control, more capacity in how they move, train, and live. This is not a place built around trends, but around standards.",
      "Built for full-spectrum performance training—Strength, Conditioning, Calisthenics, Boxing, MMA, Yoga, Endurance, and Recovery.",
      "We train strength that holds under pressure, endurance that doesn’t break under fatigue, and movement that builds resilience—not just appearance. Recovery is treated with the same seriousness as effort.",
      "The idea is simple: one place to train with intent, recover properly, and progress across multiple disciplines without compromise.",
    ],
  },
  location: {
    area: "HRBR", // real — source value
    placeholder: false,
    // Display bits for the map snippet.
    neighborhood: "HRBR Layout",
    city: "Bengaluru",
    // Google Maps deep link — the club's own confirmed pin, as a maps.app.goo.gl
    // short link. Google resolves it to the place on web and hands off to the
    // Maps app on mobile. Read by both the footer and the contact page via
    // `<MapSnippet mapsUrl={…} />`, so this is the only place to change it.
    mapsUrl: "https://maps.app.goo.gl/7krXJMgJYsdod7UQA",
    // The confirmed pin for "GRIT FIT Luxe Health Club", read off the place
    // marker that the link above resolves to. Shown as a coordinate readout on
    // the map card, which takes the place of the city line.
    coordinates: { lat: 13.0161614, lng: 77.6473416 },
  },
  // Source marks contact + hours "Yet to work on" → placeholders.
  contact: {
    email: { value: "hello@gritfit.club", placeholder: true } as MaybePlaceholder,
    phone: { value: "+91 00000 00000", placeholder: true } as MaybePlaceholder,
    address: {
      value: "HRBR Layout, Bengaluru",
      placeholder: true,
    } as MaybePlaceholder,
  },
  hours: [
    { days: "Mon — Fri", time: "Yet to be confirmed", placeholder: true },
    { days: "Sat — Sun", time: "Yet to be confirmed", placeholder: true },
  ],
  socials: [
    { label: "Instagram", href: "#", placeholder: true },
    { label: "Facebook", href: "#", placeholder: true },
    { label: "Twitter", href: "#", placeholder: true },
  ],
} as const;
