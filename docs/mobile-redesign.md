# Mobile Native Redesign — progress log

Goal: make the **mobile** experience read as a native app, not a resized desktop
site. Two hard constraints from the client:

1. **Content flow is preserved** — every page keeps its established order
   (info → CTA → FAQ). No bottom tab bar (it would fragment the single-scroll
   narrative).
2. **Fast on old phones** — CSS-driven, GPU-friendly only. No new dependencies,
   no JS scroll loops. Heavy effects dial *down* on mobile, never up.

**Desktop must not change.** Every change lives behind a mobile breakpoint
(below `lg` = 1024px), exactly where the desktop layout already hands off.

Direction approved from the visual proposal (artifact "Grit Fit Mobile"):
native feel, no tab bar, Nike/Equinox editorial reference.

Branch: `mobile-native-redesign`.

---

## Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Foundation: mobile globals, touch targets, edge-to-edge helper, condensed app header that hides on scroll-down | ✅ |
| 2 | Sticky Join + WhatsApp CTA bar (folds in the FAB) | ✅ |
| 3 | Snap carousels — home pillars & membership teaser (mobile only) | ✅ |
| 4 | Full-screen nav sheet refinement, interior polish, mobile perf pass, QA | ✅ |

---

## Change log

### Phase 1 — Foundation ✅

- **`app/globals.css`**
  - `html`: `-webkit-text-size-adjust:100%` — locks type size on landscape rotate.
  - `body`: `-webkit-tap-highlight-color:transparent` — no grey tap flash.
  - `.edge-bleed` utility — cancels the container gutter (px-5 → px-8 → reset)
    so media/carousels run full-bleed on mobile; **flush again at `lg`**.
  - `.pb-safe` / `.bottom-safe` — honour the iOS home indicator / Android gesture
    bar for fixed bottom furniture (used by the Phase 2 sticky CTA).
- **`components/layout/header.tsx`**
  - Mobile bar retracts on scroll-down, returns on scroll-up (native app feel),
    driven by the existing `motion` `scrollY` — no new listeners. Pinned open on
    desktop via `lg:translate-y-0`, so **desktop behaviour is unchanged**.
  - Mobile bar height `h-16 → h-14` (desktop stays `lg:h-20`).
  - Burger + "Join" tap targets raised to ~44px.

**Verified:** mobile (390px) — bar shows at top, hides on scroll-down, returns on
scroll-up with its scrolled background. Desktop (1440px) — nav, centred logo,
2-col pillars all unchanged; header stays visible when scrolled. `eslint` clean.

### Phase 2 — Sticky CTA ✅

- **`components/mobile/sticky-cta.tsx`** (new) — mobile-only (`lg:hidden`) bottom
  bar: "Join Club" (WhatsApp join link) + WhatsApp chat button. Appears once past
  the first screen (`scrollY > 400`), retracts as the footer enters view
  (IntersectionObserver, `rootMargin -12%`) so it never covers footer links.
  Safe-area padding baked in. Slide/fade via transform+opacity only.
- **`components/whatsapp-fab.tsx`** — now `hidden lg:inline-flex`: desktop keeps
  the FAB; on mobile the sticky bar carries the WhatsApp action, so the two never
  stack.
- **`app/(site)/layout.tsx`** — render `<StickyCta />` alongside the FAB.

**Verified:** mobile — bar appears after the hero, hides at the footer (all
footer links uncovered). Desktop — sticky bar `display:none`, FAB `display:flex`.
`eslint` clean.

### Phase 3 — Snap carousels ✅

- **`components/mobile/snap-rail.tsx`** (new) — reusable CSS scroll-snap deck.
  Edge-to-edge track (`edge-bleed`), snap-start slides, hidden scrollbar,
  progress dots driven by one passive scroll listener that writes state only when
  the active slide changes. No library, no scroll-driven layout.
- **`app/(site)/page.tsx`**
  - Pillars: existing editorial alternating rows kept **verbatim** behind
    `hidden lg:block`; a mobile-only (`lg:hidden`) `SnapRail` of pillar cards
    added — same copy, **full blurb preserved**, whole card tappable.
  - Membership teaser: grid wrapped `hidden … lg:grid`; mobile-only `SnapRail` of
    plan cards added, opening on Core with the "Most Chosen" Elite card
    brand-bordered.

**Verified:** mobile — both decks swipe and snap, dots track position, next card
peeks, content flows straight into the next section. Desktop (1440px) — mobile
rails `display:none`; editorial pillar rows and the 3-col membership grid render
exactly as before. `eslint` clean.

### Phase 4 — Nav, polish & perf ✅

- **`components/layout/header.tsx`** — mobile nav sheet reworked into a
  full-screen takeover (`data-[side=left]:w-full`): "Menu" eyebrow, oversized
  display links with a brand arrow that slides in, and a pinned foot — primary
  "Join Club" (WhatsApp) plus a quieter "Or book an assessment" (`secondaryCta`).
  Safe-area padding at the foot.
- **`app/globals.css`** — mobile perf: the fixed full-viewport film-grain blend
  layer is dropped below `lg` (invisible at 0.04 opacity, but it composites over
  the page on every scroll frame). Desktop grain unchanged.
- **Interior pages** — reviewed on mobile (Strength Club as representative): the
  immersive PageHero, step list, "we do / we don't" grid, centred CTA close and
  FAQ accordion (48px touch targets) already flow cleanly top-to-bottom; no
  markup changes were needed — the flow carries over intact.
- **Left as-is on purpose:** Lenis smooth-scroll (already `smoothWheel:false`,
  reduced-motion gated, and the team documents why it stays) and the Ken-Burns
  hero (a compositor-only transform — cheap). Touching either risked desktop.

**Verified:** mobile — full-screen nav opens/closes, arrows + pinned CTAs render;
interior hero + FAQ flow intact. Whole-project `tsc --noEmit` passes (0 errors);
`eslint` clean on all changed files.

---

## Testing & verification summary

All phases verified at **390px** (mobile) and **1440px** (desktop) via Playwright
against the running dev server:

- **Mobile gains:** retracting app header; sticky Join/WhatsApp bar (hides at
  footer); pillars & membership swipe decks with dots; full-screen nav; grain
  dropped for perf. Page height on the home route drops substantially as the two
  stacked sections become single-screen decks.
- **Desktop guarantee:** header (nav, centred logo, height, always-visible),
  editorial pillar rows, 3-col membership grid, grain, and all interior pages
  render **identically** — every change is gated below `lg` or is additive
  mobile-only markup. Confirmed mobile-only wrappers report `display:none` at
  1440px.
- **Performance:** no new dependencies; carousels are native CSS scroll-snap;
  all added motion is transform/opacity; one passive scroll flag + two
  IntersectionObservers total; grain blend removed on mobile.

_Note:_ a full `next build` was intentionally not run so it wouldn't clobber the
active dev server's `.next` on Windows; `tsc --noEmit` (whole project) is green.
