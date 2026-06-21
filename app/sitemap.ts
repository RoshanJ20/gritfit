import type { MetadataRoute } from "next";

// Required for `output: "export"` (static generation).
export const dynamic = "force-static";

const base = "https://gritfit.club";

const routes = [
  "",
  "/rush",
  "/rush/peak",
  "/rush/flow",
  "/rush/skilllab",
  "/strength-club",
  "/recovery",
  "/recovery/sauna",
  "/recovery/cold-plunge",
  "/recovery/massage",
  "/amenities",
  "/amenities/about",
  "/training",
  "/training/offerings",
  "/training/coaches",
  "/training/testimonials",
  "/programs/strong-start",
  "/programs/strong-performance",
  "/programs/youth",
  "/programs/injury-return",
  "/programs/postnatal",
  "/membership",
  "/first-timers",
  "/faq",
  "/club-standards",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
