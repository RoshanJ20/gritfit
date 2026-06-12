/**
 * Navigation map. Drives the desktop split mega-nav and the mobile sheet.
 *
 * The header labels and dropdown items mirror the previous Grit Fit site
 * (src/components/Header.js) WORD FOR WORD — only the route paths are updated to
 * this app's cleaner URLs. Do not reword these without confirming.
 *
 *   Left   : Strength Club (About Strength Club / Offerings)
 *            RUSH (About RUSH / Offerings)
 *            Essential Recovery (About Recovery / Offerings)
 *   Right  : Trainings (Offerings / Meet the coaches / Testimonials)
 *            Amenities (About Amenities / Offerings)
 *            Join Club (CTA — see primaryCta)
 */

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  side: "left" | "right";
  links: NavLink[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Strength Club",
    href: "/strength-club",
    side: "left",
    links: [
      { label: "About Strength Club", href: "/strength-club/about" },
      { label: "Offerings", href: "/strength-club" },
    ],
  },
  {
    label: "RUSH",
    href: "/rush",
    side: "left",
    links: [
      { label: "About RUSH", href: "/rush/about" },
      { label: "Offerings", href: "/rush" },
    ],
  },
  {
    label: "Essential Recovery",
    href: "/recovery",
    side: "left",
    links: [
      { label: "About Recovery", href: "/recovery/about" },
      { label: "Offerings", href: "/recovery" },
    ],
  },
  {
    label: "Trainings",
    href: "/training",
    side: "right",
    links: [
      { label: "Offerings", href: "/training/offerings" },
      { label: "Meet the coaches", href: "/training/coaches" },
      { label: "Testimonials", href: "/training/testimonials" },
    ],
  },
  {
    label: "Amenities",
    href: "/amenities",
    side: "right",
    links: [
      { label: "About Amenities", href: "/amenities/about" },
      { label: "Offerings", href: "/amenities" },
    ],
  },
];

// "Join Club" CTA — verbatim label from the old header.
export const primaryCta = { label: "Join Club", href: "/membership" };
export const secondaryCta = { label: "Book an Assessment", href: "/contact" };
