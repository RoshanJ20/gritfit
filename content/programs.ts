/**
 * Training programs. All copy VERBATIM from "Webiste write up.xlsx" →
 * Programs (Strong Start, Strong Performance) and Others (Athletic Youth
 * Development, Injury Return Training, PostNatal). `lead` is the source's first
 * line; `paras` are the remaining lines, unedited.
 */

export type Program = {
  slug: string;
  href: string;
  name: string;
  group: "core" | "specialised";
  lead: string;
  paras: string[];
};

export const programs: Program[] = [
  {
    slug: "strong-start",
    href: "/programs/strong-start",
    name: "Strong Start",
    group: "core",
    lead: "If your goal is to feel better, move better, and build a stronger, healthier body — this is where you start.",
    paras: [
      "Strong Start is built for real-life results: fat loss, muscle building, strength, flexibility, mobility, and sustained energy. It’s not about extremes — it’s about building a body that works better every day.",
      "Choose focused 1-on-1 coaching for full personalization, or semi-private training for structure with shared energy and accountability.",
      "This is where consistency turns into transformation.",
    ],
  },
  {
    slug: "strong-performance",
    href: "/programs/strong-performance",
    name: "Strong Performance",
    group: "core",
    lead: "If you train for more than just fitness — this is your lane.",
    paras: [
      "Strong Performance is built for athletes, hybrid racers, competitive individuals, and those who want to move with purpose and efficiency. Training focuses on movement quality, strength under fatigue, conditioning, and mindset under pressure.",
      "This is not basic fitness — this is structured development for output, performance, and control.",
      "Available in 1-on-1 coaching for precision development or semi-private training for competitive energy and push.",
      "This is where you stop training casually — and start training with intent.",
    ],
  },
  {
    slug: "youth",
    href: "/programs/youth",
    name: "Athletic Youth Development",
    group: "specialised",
    lead: "Built for young athletes aged 8–18, this program develops the physical foundations for long-term athletic success.",
    paras: [
      "Training focuses on speed, strength, coordination, balance, movement quality, and injury resilience while creating confidence, discipline, and strong movement habits that support performance across all sports.",
      "Whether preparing for school sport, club competition, or elite pathways, we help young athletes build the skills that matter most.",
      "This is where potential becomes performance.",
    ],
  },
  {
    slug: "injury-return",
    href: "/programs/injury-return",
    name: "Injury Return Training",
    group: "specialised",
    lead: "Returning from injury takes more than time—it takes the right plan.",
    paras: [
      "This program combines movement assessment, progressive strength training, mobility, and controlled loading to help restore function, rebuild confidence, and safely return to full training.",
      "Every stage is carefully coached, ensuring progress without rushing the process.",
      "This is where healing turns into strength.",
    ],
  },
  {
    slug: "postnatal",
    href: "/programs/postnatal",
    name: "Postnatal Performance",
    group: "specialised",
    lead: "Designed for women returning to training after pregnancy and childbirth.",
    paras: [
      "This program focuses on rebuilding strength from the inside out through core and pelvic floor restoration, mobility work, strength training, and gradual progression back into full-body movement.",
      "Every session is adapted to your stage of recovery, helping you move with confidence, rebuild strength, and return to training at a pace that works for you.",
      "Reconnect with your body. Rebuild your strength. Return with confidence.",
    ],
  },
];

export const getProgram = (slug: string) =>
  programs.find((p) => p.slug === slug);
