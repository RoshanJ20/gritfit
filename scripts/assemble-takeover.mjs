/**
 * TEMPORARY LAUNCH TAKEOVER (added 2026-09-17).
 *
 * Re-shapes the static export in `out/` so the public site is parked while the
 * real site stays viewable under `/dev`:
 *
 *   out/                      out/
 *     index.html      ->        index.html   (static holding page, this script)
 *     rush.html                 robots.txt   (Disallow: / — this script)
 *     _next/...                 _headers     (/dev-prefixed headers + noindex)
 *     hero.mp4                  dev/
 *     images/...                  index.html (the real homepage)
 *     ...                         rush.html
 *                                 _next/...
 *                                 hero.mp4   (public assets move here too, so
 *                                 images/...  the /dev asset() paths resolve)
 *                                 ...
 *
 * This is the physical half of the `basePath: "/dev"` mechanism (next.config.ts):
 * basePath rewrites every URL inside the HTML to `/dev/...`, and this script
 * moves the files to where those URLs point, then adds the root holding page.
 *
 * Runs from the `postbuild` npm hook, so it fires on every `npm run build`
 * (and therefore on `pages:deploy`, which now calls `npm run build`).
 *
 * TO RESTORE THE LIVE SITE:
 *   1. delete `basePath: "/dev"` from next.config.ts
 *   2. delete the `postbuild` hook and revert `pages:deploy` in package.json
 *   3. delete this file
 *   4. redeploy
 * No application code under app/ or components/ is ever touched.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const devDir = path.join(outDir, "dev");

if (!existsSync(outDir)) {
  throw new Error("assemble-takeover: out/ not found — run `next build` first.");
}

// Idempotency guard: if a previous run already nested everything under out/dev,
// don't nest it again (which would bury the holding page under out/dev/dev).
if (existsSync(devDir) && existsSync(path.join(outDir, "index.html"))) {
  const holding = readFileSync(path.join(outDir, "index.html"), "utf8");
  if (holding.includes("launch-takeover-holding")) {
    console.log("assemble-takeover: already assembled — nothing to do.");
    process.exit(0);
  }
}

// 1. Move the entire export — pages, _next/*, AND the public/ assets — into
//    out/dev/. The app references every public path through asset() (lib/asset.ts),
//    which prefixes it with /dev, so the files must live under /dev to match
//    (e.g. the homepage requests /dev/hero.mp4). Snapshot the listing first so
//    we never try to move out/dev into itself.
const entries = readdirSync(outDir);
mkdirSync(devDir, { recursive: true });
for (const name of entries) {
  if (name === "dev") continue;
  renameSync(path.join(outDir, name), path.join(devDir, name));
}

// 2. Root holding page — fully self-contained (logo inlined as a data URI) so
//    it cannot break no matter how assets resolve.
const logoRel = "images/logo-gritfit.png";
const logoB64 = readFileSync(path.join(root, "public", logoRel)).toString(
  "base64",
);
const holdingHtml = `<!doctype html>
<html lang="en" class="launch-takeover-holding">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="darkreader-lock" content="true" />
    <title>Grit Fit — The Luxe Club</title>
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      html, body { height: 100%; margin: 0; }
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.75rem;
        min-height: 100dvh;
        padding: 2rem;
        background: #0a0a0a;
        color: #f5f5f0;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        text-align: center;
      }
      img { width: min(280px, 62vw); height: auto; }
      p {
        margin: 0;
        font-size: 0.8rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: #9a9a92;
      }
    </style>
  </head>
  <body>
    <img src="data:image/png;base64,${logoB64}" alt="Grit Fit" />
    <p>Opening soon</p>
  </body>
</html>
`;
writeFileSync(path.join(outDir, "index.html"), holdingHtml, "utf8");

// 3. Root robots.txt — keep the parked /dev site out of search entirely. The
//    app's own robots (now at /dev/robots.txt) is harmless: crawlers read the
//    root one.
writeFileSync(
  path.join(outDir, "robots.txt"),
  "# TEMPORARY LAUNCH TAKEOVER (added 2026-09-17). Keep the parked site out of\n" +
    "# search while it lives under /dev. Restored automatically once basePath is\n" +
    "# removed from next.config.ts and this takeover is torn down.\n" +
    "User-agent: *\nDisallow: /\n",
  "utf8",
);

// 4. Root _headers (Cloudflare Pages only reads this at the deploy root). The
//    app's public/_headers moved under out/dev/ in step 1; its hero-media cache
//    rules now need the /dev prefix to match the moved files. Copy it to the
//    root with paths prefixed, and append a noindex header on the /dev tree.
let headers = "";
const srcHeaders = path.join(devDir, "_headers");
if (existsSync(srcHeaders)) {
  headers = readFileSync(srcHeaders, "utf8")
    .split("\n")
    .map((line) => (/^\/\S/.test(line) ? "/dev" + line : line))
    .join("\n");
}
headers +=
  "\n# TEMPORARY LAUNCH TAKEOVER: no search engine should index the parked site.\n" +
  "/dev/*\n  X-Robots-Tag: noindex\n";
writeFileSync(path.join(outDir, "_headers"), headers, "utf8");

console.log("assemble-takeover: parked site under /dev, holding page at /.");
