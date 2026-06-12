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
    lead: "For young athletes building their base—speed, strength, coordination, and movement skills.",
    paras: [
      "Structured training that develops athletic fundamentals, improves performance, and builds long-term resilience against injury.",
      "A performance-driven space built for athletes and teams across youth, collegiate, and professional levels. We offer dedicated training, team development, and performance-based classes for ages 8–18.",
      "Our promise is simple: a high-quality environment and expert coaching that helps individuals grow as athletes—and as students of life.",
    ],
  },
  {
    slug: "injury-return",
    href: "/programs/injury-return",
    name: "Injury Return Training",
    group: "specialised",
    lead: "For individuals returning from injury or pain who need a safe path back to training.",
    paras: [
      "Includes movement assessment, progressive strength work, mobility, and controlled loading to restore function, rebuild confidence, and return to full training safely.",
    ],
  },
  {
    slug: "postnatal",
    href: "/programs/postnatal",
    name: "Postnatal",
    group: "specialised",
    lead: "For postnatal women returning to fitness after pregnancy and childbirth.",
    paras: [
      "Includes core and pelvic floor reconditioning, mobility, strength rebuilding, and gradual progression to restore stability, energy, and full-body confidence.",
    ],
  },
];

export const getProgram = (slug: string) =>
  programs.find((p) => p.slug === slug);
