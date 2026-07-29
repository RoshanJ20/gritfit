import type { Metadata } from "next";

import { CountdownClient } from "./countdown-client";

export const metadata: Metadata = {
  title: "Launching soon — Grit Fit",
  description: "Grit Fit — The Luxe Club. Opening in HRBR Layout, Bengaluru.",
  // Unlisted by design: absent from app/sitemap.ts and kept out of the index so
  // the takeover never competes with the real site in search results.
  robots: { index: false, follow: false },
};

export default function CountdownPage() {
  return <CountdownClient />;
}
