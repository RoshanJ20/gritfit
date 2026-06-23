/**
 * Per-image strength of the brand dark/lime duotone grade applied by
 * `MediaPlaceholder`. The further an original photo sits from the site's
 * dark/lime palette, the heavier the wash needed to pull it into the theme:
 *
 *   ~0.10–0.20  already dark / black-and-white / low-key  → barely-there wash
 *   ~0.30–0.45  some colour or daylight                   → moderate grade
 *   ~0.50–0.65  bright, colourful, or off-theme           → heavy grade
 *
 * Each value was set by eye against the actual photo. `getImageTint` returns the
 * mapped value, or a moderate fallback for anything not listed.
 */
export const imageTint: Record<string, number> = {
  // --- Already on-theme: dark / B&W / near-black → minimal wash ---
  "/images/contact.jpg": 0.1,
  "/images/club-interior.jpg": 0.12,
  "/images/home/strength.jpg": 0.12,
  "/images/rush/calisthenics.jpg": 0.12,
  "/images/rush/kettlebell.jpg": 0.12,
  "/images/rush/authentic-yoga.jpg": 0.12,
  "/images/training/one-on-one.jpg": 0.14,
  "/images/rush/strength-build.jpg": 0.15,
  "/images/amenities.jpg": 0.18,
  "/images/programs/strong-start.jpg": 0.18,
  "/images/amenities-about.jpg": 0.2,
  "/images/programs/strong-performance.jpg": 0.2,
  "/images/rush/dance.jpg": 0.2,
  "/images/rush/foundation.jpg": 0.2,

  // --- Some colour or daylight → moderate grade ---
  "/images/first-timers.jpg": 0.28,
  "/images/programs/postnatal.jpg": 0.3,
  "/images/training/coaching.jpg": 0.3,
  "/images/training/index-hero.jpg": 0.3,
  "/images/rush/fight.jpg": 0.35,
  "/images/rush/movement.jpg": 0.4,
  "/images/rush/forcex.jpg": 0.4,
  "/images/rush/mobility.jpg": 0.4,
  "/images/home/rush.jpg": 0.4,
  "/images/faq.jpg": 0.42,
  "/images/rush/skillab-hero.jpg": 0.42,
  "/images/rush/conditioning.jpg": 0.42,
  "/images/rush/peak-hero.jpg": 0.42,
  "/images/recovery/cold-plunge.jpg": 0.45,
  "/images/recovery/contrast.jpg": 0.45,
  "/images/home/recovery.jpg": 0.45,
  "/images/rush/yoga.jpg": 0.45,
  "/images/rush/forge.jpg": 0.45,

  // --- Bright / colourful / off-theme → heavy grade ---
  "/images/recovery/sauna.jpg": 0.5,
  "/images/recovery/massage.jpg": 0.5,
  "/images/programs/injury-return.jpg": 0.5,
  "/images/rush/yogax.jpg": 0.5,
  "/images/training/semi-private.jpg": 0.5,
  "/images/rush/running.jpg": 0.55,
  "/images/programs/youth.jpg": 0.6,
  "/images/training/offerings-hero.jpg": 0.62,
  "/images/training/client-voices.jpg": 0.65,
};

/** Mapped tint for an image src, or a moderate fallback when unlisted. */
export function getImageTint(src?: string, fallback = 0.4): number {
  if (!src) return fallback;
  return imageTint[src] ?? fallback;
}
