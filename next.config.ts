import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Cloudflare's image optimizer needs a paid binding; until real
    // photography + a loader are wired up, serve images unoptimized.
    unoptimized: true,
  },
};

export default nextConfig;

// Lets `next dev` access the Cloudflare bindings defined in wrangler.jsonc.
initOpenNextCloudflareForDev();
