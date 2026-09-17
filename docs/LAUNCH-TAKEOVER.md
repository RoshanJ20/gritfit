# Launch Takeover — parked site under `/dev`

**Status:** ACTIVE (added 2026-09-17)
**Goal:** temporarily show a static holding page at the public root while the
real site stays fully viewable and deployable under `/dev`.

- `https://gritfit.club/` → static "Opening soon" holding page
- `https://gritfit.club/dev` (and `/dev/rush`, `/dev/training`, …) → the real site
- Push to `main` + deploy as usual → the `/dev` site updates.

> **To undo this in a few days, jump to [How to revert](#how-to-revert).**
> You can paste this whole file to Claude and say "revert the launch takeover
> per this doc" — the steps below are exact.

---

## Why it's built this way (context)

The site is a **static export** (`output: "export"` → Cloudflare Pages serving
`out/`). Static export disables middleware / rewrites / redirects, so the parking
is done with Next's `basePath` plus a build-time assembly step:

- `basePath: "/dev"` relocates every route and auto-prefixes all `next/link`
  navigation — **but it does not prefix hand-authored asset paths** in
  `<img>` / `<video>` / `next/image` (e.g. `/hero.mp4`, `/images/...`). Those are
  prefixed by a small `asset()` helper instead.
- A `postbuild` script reshapes the exported `out/` so the files physically live
  where the `/dev` URLs point, and drops the holding page at the root.

---

## Exactly what changed

| File | Change | Revert?|
|---|---|---|
| `next.config.ts` | Added `BASE_PATH = "/dev"`, `basePath: BASE_PATH`, `env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH }` | **Required** |
| `package.json` | Added `"postbuild"` hook; changed `pages:deploy` to run `npm run build` | **Required** |
| `scripts/assemble-takeover.mjs` | **New** — postbuild step (moves export → `out/dev/`, writes root holding page, `robots.txt`, `_headers`) | **Required** (delete) |
| `lib/asset.ts` | **New** — `asset(path)` prefixes public paths with `NEXT_PUBLIC_BASE_PATH` | Optional (becomes a no-op) |
| `components/hero-video.tsx` | `stamp()` wraps url in `asset()` | Optional (no-op) |
| `components/media-placeholder.tsx` | `<img src={asset(src)}>` | Optional (no-op) |
| `components/sections/page-hero.tsx` | `<img src={asset(backgroundImage)}>` | Optional (no-op) |
| `components/sections/training-programs.tsx` | `<img src={asset(category.image)}>` and `asset(program.image)` | Optional (no-op) |
| `components/layout/header.tsx` | `<Image src={asset("/images/finalgritfitlogo.png")}>` | Optional (no-op) |
| `docs/LAUNCH-TAKEOVER.md` | **New** — this file | Optional (delete) |

**Key design choice:** the `asset()` helper reads `NEXT_PUBLIC_BASE_PATH`. Once
that env var is gone (step 1 of revert), `asset("/x")` returns `"/x"` unchanged —
so **the six component edits become harmless no-ops and do not need to be reverted.**
The only *required* revert actions are the config, the package.json hook, and
deleting the assembly script.

**No application logic, routes, or content were changed** — only asset-path
prefixing and build config.

---

## How it behaves

- **Production (`npm run build` → `out/`):** everything under `out/dev/`; root has
  `index.html` (holding), `robots.txt` (`Disallow: /`), `_headers`.
- **Local dev (`npm run dev`):** the real site is at **`localhost:3000/dev`**.
  `localhost:3000/` returns **404** — that's expected; the holding page only
  exists in the production build, not in `next dev`.

---

## How to revert

Do these in order, then redeploy. (Minimal path — leaves the no-op `asset()`
call sites in place.)

### 1. `next.config.ts`
Remove the takeover block so the file matches the original. Delete:
- the `// TEMPORARY LAUNCH TAKEOVER …` comment block,
- the line `const BASE_PATH = "/dev";`,
- the line `basePath: BASE_PATH,`,
- the line `env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },`.

The result should be exactly:
```ts
const nextConfig: NextConfig = {
  output: "export",
  // Pin the workspace root to THIS directory. ...
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
};
```

### 2. `package.json`
- Delete the line: `"postbuild": "node scripts/assemble-takeover.mjs",`
- Change `pages:deploy` back to:
  ```json
  "pages:deploy": "next build && wrangler pages deploy out --project-name=gritfit",
  ```

### 3. Delete the assembly script
```
rm scripts/assemble-takeover.mjs
```

### 4. (Optional cleanup — safe to skip)
`lib/asset.ts` and the six `asset(...)` call sites are no-ops once step 1 is done.
Leave them, **or** remove `lib/asset.ts` and unwrap the six call sites
(hero-video, media-placeholder, page-hero, training-programs ×2, header) plus
their `import { asset } from "@/lib/asset";` lines. Also delete this doc.

### 5. Rebuild and verify locally
```
rm -rf .next out
npm run build
npx serve out -l 5060
```
Check: `http://localhost:5060/` = the real homepage; `http://localhost:5060/rush`
= 200; hero video + images load. `/dev` should now 404.

### 6. Deploy
`npm run pages:deploy` (or push to `main` if Cloudflare Pages auto-builds).
`https://gritfit.club/` is the real site again.

---

## Verification checklist (either state)

- **Takeover active:** `/` = holding page; `/dev` + subpages load; hero video and
  all images load under `/dev`; `/rush` (no prefix) = 404.
- **Reverted:** `/` = real homepage; `/rush` etc. load; `/dev` = 404.

Last verified 2026-09-17: 34 image/video assets across 11 pages load `200` in both
`next dev` and the built `out/`.
