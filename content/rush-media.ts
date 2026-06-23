/**
 * Maps RUSH class formats and model heroes to their imagery. Kept separate from
 * the verbatim copy in `rush.ts` so content and media stay decoupled. Keyed by
 * the exact `name` used in the content so `FormatList` can look images up
 * automatically. Some categories intentionally share an image (e.g. the two
 * yoga formats).
 */
export const rushFormatImages: Record<string, string> = {
  // Peak
  Endure: "/images/rush/conditioning.jpg",
  "Strength Build": "/images/programs/strong-performance.jpg",
  Hybrid: "/images/rush/kettlebell.jpg",
  // Flow
  "Authentic Yoga": "/images/rush/yoga.jpg",
  "Authentic YogaX": "/images/rush/yoga.jpg",
  Ground: "/images/rush/mobility.jpg",
  Move: "/images/rush/dance.jpg",
  // Skillab
  Fight: "/images/rush/fight.jpg",
  Barlethics: "/images/rush/calisthenics.jpg",
  Foundation: "/images/rush/foundation.jpg",
  Movement: "/images/rush/mobility.jpg",
  Forge: "/images/rush/calisthenics.jpg",
  ForceX: "/images/rush/conditioning.jpg",
  "Running Division": "/images/rush/running.jpg",
};

/** Per-model hero imagery for the Peak / Flow / Skillab pages. */
export const rushHeroImages: Record<string, string> = {
  Peak: "/images/programs/strong-start.jpg",
  Flow: "/images/rush/yoga.jpg",
  Skillab: "/images/rush/fight.jpg",
};
