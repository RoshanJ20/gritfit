/**
 * Prefix a public (`/…`) asset path with the app's basePath.
 *
 * Why this exists: `basePath` (next.config.ts) auto-prefixes `next/link` and
 * Next-managed URLs, but NOT hand-authored asset paths in `<img src>` /
 * `<video src>` / `backgroundImage`. Under `basePath: "/dev"`, `next dev` serves
 * public files at `/dev/hero.mp4` and the parked static export moves them under
 * `/dev/` too — so those raw paths must carry the prefix to resolve in both.
 *
 * Single source of truth: `NEXT_PUBLIC_BASE_PATH` is set from `BASE_PATH` in
 * next.config.ts. When the launch takeover is torn down (basePath removed), the
 * var is empty and this helper returns the path unchanged — so the call sites
 * can stay in place as harmless no-ops; they don't have to be reverted.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${BASE}${path}` : path;
}
