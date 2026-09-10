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
| 3 | Snap carousels — home pillars & membership teaser (mobile only) | ⏳ |
| 4 | Full-screen nav sheet refinement, interior polish, mobile perf pass, QA | ⏳ |

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

_(updated per phase)_
