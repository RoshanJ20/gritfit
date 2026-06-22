import path from "node:path";

import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  output: "export",
  // Pin the workspace root to THIS directory. A stray package-lock.json in the
  // home folder makes Next infer the wrong root, which breaks Turbopack's
  // persistent cache on Windows ("Unable to write SST file"). Pinning it stops
  // the misdetection and the resulting dev-server 500s.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Cloudflare's image optimizer needs a paid binding; until real
    // photography + a loader are wired up, serve images unoptimized.
    unoptimized: true,
  },
};

export default nextConfig;

// Lets `next dev` access the Cloudflare bindings defined in wrangler.jsonc.
initOpenNextCloudflareForDev();
