/**
 * Team + testimonials. The source only provides the team VALUES line and field
 * LABELS (Name / Title / Personal Statement / What excites them about their
 * profession) — no actual coaches. Likewise testimonials are marked "Actual
 * review" with no real reviews. So individual coaches and reviews render as
 * clearly-marked placeholders. Only the verbatim lines below are real.
 */

export const team = {
  eyebrow: "The Team",
  values:
    "We build our team around three values: humility, consistency, and a commitment to continuous learning.",
  // Field labels from the source — used to structure each (placeholder) profile.
  fields: ["Name", "Title", "Personal Statement"] as const,
  // Number of placeholder coach slots to lay out until real profiles arrive.
  placeholderCount: 6,
};

export const testimonials = {
  eyebrow: "Testimonials",
  heading: "Client Voices",
  // Source: "Trusted by professionals,Loved by beginners"
  tagline: "Trusted by professionals, loved by beginners.",
  placeholderCount: 4,
};
