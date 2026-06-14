import type { MetadataRoute } from "next";

// Required for `output: "export"` (static generation).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://gritfit.club/sitemap.xml",
  };
}
