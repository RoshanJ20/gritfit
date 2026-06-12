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
  signatureLine: "Lift. Run. Fight. Fly. Stretch. Recover. And more.",
  signatureWords: [
    "Lift",
    "Run",
    "Fight",
    "Fly",
    "Stretch",
    "Recover",
    "And more",
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
      "We’ve built a full training space where everything sits under one roof — strength, conditioning, calisthenics, boxing, MMA, yoga, endurance work, and recovery like contrast therapy.",
      "It’s not a standard gym setup. Even the machines aren’t off-the-shelf catalogue equipment. Everything is carefully selected, and in some cases custom-built with top manufacturers, chosen purely for performance and how well it helps people train better.",
      "The idea is simple: one place where you can train hard, recover properly, and progress across different styles of training without switching spaces.",
    ],
  },
  location: {
    area: "HRBR", // real — source value
    placeholder: false,
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
