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
  Hybrid: "/images/rush/conditioning.jpg",
  // Flow
  "Authentic Yoga": "/images/rush/authentic-yoga.jpg",
  "Authentic YogaX": "/images/rush/yogax.jpg",
  Ground: "/images/rush/mobility.jpg",
  // Skillab
  Taekwondo: "/images/rush/taekwondo.jpg",
  Strike: "/images/rush/fight.jpg",
  Barlethics: "/images/rush/skillab-hero.jpg",
  Foundation: "/images/rush/foundation.jpg",
  Movement: "/images/rush/movement.jpg",
  Forge: "/images/rush/forge.jpg",
  ForceX: "/images/programs/youth.jpg",
  "Running Division": "/images/rush/running.jpg",
};

/** Per-model hero imagery for the Peak / Flow / Skillab pages. */
export const rushHeroImages: Record<string, string> = {
  Peak: "/images/rush/kettlebell.jpg",
  Flow: "/images/rush/yoga.jpg",
  Skillab: "/images/programs/strong-performance.jpg",
};
