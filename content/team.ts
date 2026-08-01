/**
 * Team values + testimonials. Real coach profiles now live in
 * `content/coaches.ts` (sourced from "Coaches write up for website.xlsx");
 * this file keeps only the values line and field labels the original brief
 * supplied. Testimonials are still marked "Actual review" with no real reviews,
 * so they render as clearly-marked placeholders.
 */

export const team = {
  eyebrow: "The Team",
  values:
    "We build our team around three values: humility, consistency, and a commitment to continuous learning.",
  // Field labels from the source — used to structure each (placeholder) profile.
  fields: ["Name", "Title", "Personal Statement"] as const,
};

export const testimonials = {
  eyebrow: "Testimonials",
  heading: "Client Voices",
  // Source: "Trusted by professionals,Loved by beginners"
  tagline: "Trusted by professionals, loved by beginners.",
  placeholderCount: 4,
};
