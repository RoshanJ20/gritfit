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
    "Carry",
    "Run",
    "Fight",
    "Strike",
    "Move",
    "Fly",
    "Stretch",
    "Breathe",
    "Recover",
  ],
  philosophy: [
    "Grit Fit is home where nothing is given, everything is earned through hard work.",
    "Built on a passion for strength, movement and mindset.",
    "A training experience that meets you where you are, pushes you forward, and leaves you better every time.",
  ],
  // Source: "We've built a full training space where everything sits under one roof…"
  usp: {
    heading: "Everything you need. Nothing you don’t.",
    body: [
      "GRITFIT is for those who want more from themselves. More strength. More control. More capacity. More capability.",
      "We bring Strength, Conditioning, Calisthenics, Combat, Yoga, Movement, Recovery and Nutrition together under one roof — with coaching and structure behind every part of the experience.",
      "This is not a place built around trends, but around standards that pushes you to become better.",
      "GritFit isn’t about doing more things. It’s about becoming more capable.",
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
  // The club's WhatsApp line. `number` is the E.164 digits wa.me expects (no
  // "+", no spaces); `display` is how it reads to a human. Both the floating
  // widget and the bottom-of-page "Join Club" CTAs build their link from
  // `whatsappUrl()` in @/lib/utils, so this is the only place to change it.
  whatsapp: {
    number: "918095874762",
    display: "+91 80958 74762",
    // Prefilled first message. Kept short — WhatsApp shows it in the composer
    // and the member can edit before sending.
    message: "Hi Grit Fit — I'd like to know more about joining the club.",
    // Shorter variant for the header "Join Club" button.
    joinMessage: "Hi Grit Fit — I'd like to join the club.",
  },
  // Email + address remain "Yet to work on" → still placeholders. The named
  // contact and phone are confirmed, so they render as real values.
  contact: {
    // Who to ask for. Shown above the phone number so the number has an owner.
    name: "Bharath",
    email: { value: "hello@gritfit.club", placeholder: true } as MaybePlaceholder,
    phone: { value: "+91 80958 74762", placeholder: false } as MaybePlaceholder,
    address: {
      value: "HRBR Layout, Bengaluru",
      placeholder: true,
    } as MaybePlaceholder,
  },
  // Confirmed hours. The club runs two windows a day, so `times` is a list —
  // both the footer and the contact page stack the entries under one day label.
  hours: [
    {
      days: "Mon — Sat",
      times: ["6:00 AM — 12:30 PM", "4:30 PM — 9:00 PM"],
      placeholder: false,
    },
    { days: "Sunday", times: ["Closed"], placeholder: false },
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/grit.fit.official",
      handle: "@grit.fit.official",
      placeholder: false,
    },
    { label: "Facebook", href: "#", handle: "", placeholder: true },
    { label: "Twitter", href: "#", handle: "", placeholder: true },
  ],
} as const;
