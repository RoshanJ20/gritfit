import path from "node:path";

import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// TEMPORARY LAUNCH TAKEOVER (added 2026-09-17). The whole site is parked under
// /dev while the public root shows a static holding page (built by
// scripts/assemble-takeover.mjs). basePath relocates every route and prefixes
// all next/link navigation; NEXT_PUBLIC_BASE_PATH feeds the same prefix to the
// asset() helper (lib/asset.ts) so raw <img>/<video> paths resolve too.
// TO RESTORE THE LIVE SITE: set BASE_PATH to "" (or delete basePath + env and
// the postbuild hook), then redeploy. The asset() call sites become no-ops and
// need no reverting. Full steps: scripts/assemble-takeover.mjs header.
const BASE_PATH = "/dev";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
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
