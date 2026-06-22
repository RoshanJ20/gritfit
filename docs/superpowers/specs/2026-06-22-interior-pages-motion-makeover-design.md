# Interior Pages Motion Makeover — Design

**Date:** 2026-06-22
**Status:** Approved

## Goal

Give the interior pages of the Grit Fit site a richer, more detailed feel by
vendoring a small set of [ReactBits](https://reactbits.dev/components/)
components, re-skinning them to the existing dark-luxury / lime design system,
and composing them differently on each page so nothing feels templated.

The work adds **depth and motion underneath existing layouts** — it does not
change finalized copy, color tokens, grids, or spacing.

## Hard constraints

- **Do not touch the landing page** (`app/page.tsx`), the global header/footer,
  finalized copy, the color system, or existing page layouts/grids.
- **Tasteful / refined intensity only.** The ethos is "type is quiet, imagery
  leads." Effects elevate; they never shout.
- **No uniformity.** Shared primitives are *ingredients*. Each interior page
  gets one signature moment; no two pages repeat the same composition.
- **Respect `prefers-reduced-motion`** everywhere — every effect degrades to a
  static or near-static state.
- Reuse the installed stack: `motion` (Framer Motion successor), GSAP, Lenis.
  Do not add heavy new dependencies.

## Foundation — primitive library

New directory `components/reactbits/` holds vendored + restyled primitives. Each
is re-skinned to Grit tokens (`--brand`, `--ink-*`, hairline `--border`, Archivo
display type) and wraps the installed `motion`/GSAP stack.

| Primitive | Behavior | Grit restyle |
|---|---|---|
| `SpotlightCard` | cursor-following radial glow on a card | faint lime glow over `ink-900`, hairline border |
| `TiltedCard` | 3D tilt + glare on hover | for portrait/media slots |
| `AnimatedList` | scroll-staggered list items w/ subtle highlight | get/don't, bring-lists |
| `CountUp` | numbers count when scrolled into view | indices, format counts |
| `ScrollReveal` | word-by-word opacity reveal on big statements | statement paragraphs |
| `ShinyText` / `GradientText` | restrained sheen on one accent word | one signature word per page |
| `Carousel` | draggable, snapping card carousel | testimonials |
| `Stepper` (progress line) | connected numbered steps w/ filling progress line | strength-club how-it-works |
| Subtle background (`Squares`/dot-grid) | barely-there animated texture behind one section | depth, not decoration |

All primitives lazy-mount heavy effects and no-op under reduced motion.

## Placeholders

Add an optional `interactive` variant to the existing `MediaPlaceholder`
(tilt + spotlight + slow hatch parallax on hover) rather than a second
component. Existing slots are untouched. Add a small number of new image slots
only where an interior page is currently text-only and visibly bare.

## Per-page signature treatments

Each page gets one signature moment plus refined shared touches.

| Page | Signature moment | Supporting touches |
|---|---|---|
| Membership | `AccessLadder` rungs spring-fill on scroll; "Most Chosen" tier gets `SpotlightCard` glow | feature list = `AnimatedList`; emphasised feature pulses once |
| Amenities | `01–NN` indices `CountUp` as cards enter | each cell = `SpotlightCard`; hairline border draws on hover |
| Coaches | Portrait placeholders → `TiltedCard` (tilt + glare) | name/title cross-fade up under photo |
| Testimonials | Static grid → draggable `Carousel` w/ snap + quote flourish | avatar ring traces in lime on active card |
| Strength Club | How-it-works steps gain a filling progress line (`Stepper`) | get/don't = `AnimatedList`; creed word = `ShinyText` |
| RUSH | Model card names scramble/decrypt-in on enter | `CountUp` on "N formats"; faint `Squares` grid behind models band |
| Recovery | Contrast section hot↔cold split reveal on "Heat. Cold. Repeat." | `SiblingNav` → `SpotlightCard`; bring-list = `AnimatedList` |
| Recovery detail (×3) | `Callout` animated glow border; statement = `ScrollReveal` | one new interactive media slot per modality |
| Programs detail (×5) | Statement paras = `ScrollReveal`; `LinkList` flowing underline + arrow slide | ScrollReveal cadence tuned per program |
| Training index | Hero stat row w/ `CountUp`; `LinkList` upgrade | `Callout` glow |
| First-timers / Club-standards / FAQ / Contact | Lighter: `ScrollReveal` on lead, `SpotlightCard` on cards, subtle accordion icon motion | kept calm by design |

## Shared component upgrades

Used with different intensity/variant per consumer (per the no-uniformity rule):

- `SiblingNav`, `ModelNav`, `LinkList` → `SpotlightCard` hover + magnetic arrows.
- `Callout` → optional animated glow-border variant.
- `MediaPlaceholder` → optional `interactive` (tilt/spotlight) variant.

## Build order

1. Vendor + restyle the primitive library (`components/reactbits/`) with a
   manual verification of each in isolation.
2. Shared component upgrades (Spotlight/Tilt/Callout/MediaPlaceholder + nav).
3. Per-page signatures, highest-traffic first: Membership → Strength Club →
   Recovery → RUSH → Coaches → Testimonials → Amenities → Programs → remainder.
4. Reduced-motion + mobile + perf pass (lazy-mount heavy effects).

## Verification

- `npm run build` and `npm run lint` pass.
- Each page renders; reduced-motion shows static fallbacks.
- No layout/copy/token regressions vs. current pages.
- Landing page, header, footer unchanged.
