/**
 * Maps RUSH class formats and model heroes to their imagery. Kept separate from
 * the verbatim copy in `rush.ts` so content and media stay decoupled. Keyed by
 * the exact `name` used in the content so `FormatList` can look images up
 * automatically. Every entry is a distinct file — no image is reused anywhere
 * on the site.
 */
export const rushFormatImages: Record<string, string> = {
  // Peak
  Endure: "/images/rush/conditioning.jpg",
  "Strength Build": "/images/rush/strength-build.jpg",
  Hybrid: "/images/rush/kettlebell.jpg",
  // Flow
  "Authentic Yoga": "/images/rush/authentic-yoga.jpg",
  "Authentic YogaX": "/images/rush/yogax.jpg",
  Ground: "/images/rush/mobility.jpg",
  Move: "/images/rush/dance.jpg",
  // Skillab
  Fight: "/images/rush/fight.jpg",
  Barlethics: "/images/rush/calisthenics.jpg",
  Foundation: "/images/rush/foundation.jpg",
  Movement: "/images/rush/movement.jpg",
  Forge: "/images/rush/forge.jpg",
  ForceX: "/images/rush/forcex.jpg",
  "Running Division": "/images/rush/running.jpg",
};

/** Per-model hero imagery for the Peak / Flow / Skillab pages. */
export const rushHeroImages: Record<string, string> = {
  Peak: "/images/rush/peak-hero.jpg",
  Flow: "/images/rush/yoga.jpg",
  Skillab: "/images/rush/skillab-hero.jpg",
};
