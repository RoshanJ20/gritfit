# Interior Pages Motion Makeover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restyled ReactBits-derived motion primitives to the Grit Fit interior pages so each page gains a richer, signature feel without changing finalized copy, layout, or color tokens.

**Architecture:** Vendor a small library of motion primitives into `components/reactbits/`, each re-skinned to Grit tokens and built on the already-installed `motion`/GSAP stack. Upgrade a few shared section components to accept opt-in animated variants. Compose the primitives differently on each interior page so no two pages repeat a treatment.

**Tech Stack:** Next.js 16, React 19, `motion` (Framer Motion successor), GSAP, Lenis, Tailwind v4, `cn()` from `@/lib/utils`.

## Global Constraints

- Do NOT modify: `app/page.tsx` (landing), `components/layout/header.tsx`, `components/layout/footer.tsx`, finalized copy, color tokens in `app/globals.css` `:root`, or existing page grids/spacing.
- Intensity: tasteful/refined only. No particle storms, no full-screen takeovers.
- Every effect MUST honor `prefers-reduced-motion` via `useReducedMotion()` (motion) or the global CSS reduce block — degrade to static.
- No new heavy dependencies. Use `motion`, `gsap`, existing utilities only.
- All new client components start with `"use client"`. Server components stay server.
- Use `cn()` for class merging; use Grit tokens (`brand`, `ink-900/800/700`, `border`, `muted-foreground`, `display`, `eyebrow`).
- No-uniformity rule: each interior page composes a different subset; one signature moment per page.
- Verification per task = `npm run lint` passes for touched files + `npm run build` succeeds + render check. (No unit-test runner exists in this repo.)

---

## Phase 1 — Primitive library (`components/reactbits/`)

### Task 1: SpotlightCard

**Files:**
- Create: `components/reactbits/spotlight-card.tsx`

**Interfaces:**
- Produces: `SpotlightCard({ children, className, spotlightColor?, as? }: { children: React.ReactNode; className?: string; spotlightColor?: string; as?: "div" | "a" })`
  - `spotlightColor` defaults to `rgba(174,217,35,0.10)` (brand at low alpha).

- [ ] **Step 1: Implement.** `"use client"`. Track cursor via `onMouseMove` writing `--mx`/`--my` CSS vars on the root; render a `::before`/absolute radial-gradient layer at `radial-gradient(circle at var(--mx) var(--my), var(--spotlight) 0%, transparent 60%)` that fades opacity 0→1 on hover. Root: `relative overflow-hidden border border-border bg-ink-900`. Under `useReducedMotion()`, render a plain bordered div (no listeners).
- [ ] **Step 2: Render check.** Temporarily drop one into `app/amenities/page.tsx`, run `npm run build`. Expected: builds; glow follows cursor. Revert the temp usage.
- [ ] **Step 3: Commit** `feat: add restyled SpotlightCard primitive`.

### Task 2: TiltedCard

**Files:**
- Create: `components/reactbits/tilted-card.tsx`

**Interfaces:**
- Produces: `TiltedCard({ children, className, max?, glare? }: { children: React.ReactNode; className?: string; max?: number; glare?: boolean })`
  - `max` default 10 (deg), `glare` default true.

- [ ] **Step 1: Implement.** `"use client"`. Use `useMotionValue` for rotateX/rotateY + `useSpring`. On `onMouseMove`, map cursor offset within bounds to ±`max` degrees; reset on leave. `style={{ rotateX, rotateY, transformPerspective: 800 }}`. Optional glare = absolute white radial layer following cursor at ~0.12 alpha. Reduced motion → static wrapper.
- [ ] **Step 2: Render check** via temporary use in coaches page; `npm run build`; revert.
- [ ] **Step 3: Commit** `feat: add restyled TiltedCard primitive`.

### Task 3: CountUp

**Files:**
- Create: `components/reactbits/count-up.tsx`

**Interfaces:**
- Produces: `CountUp({ to, from?, duration?, className, pad?, prefix?, suffix? }: { to: number; from?: number; duration?: number; className?: string; pad?: number; prefix?: string; suffix?: string })`

- [ ] **Step 1: Implement.** `"use client"`. `useInView` (motion) on a ref, `once: true`. On in-view, `animate(from, to, { duration, ease })` from motion, writing rounded value to state. `pad` → `String(n).padStart(pad,"0")`. Reduced motion → render `to` immediately.
- [ ] **Step 2: Render check** in amenities; build; revert.
- [ ] **Step 3: Commit** `feat: add CountUp primitive`.

### Task 4: ScrollReveal (word-by-word)

**Files:**
- Create: `components/reactbits/scroll-reveal.tsx`

**Interfaces:**
- Produces: `ScrollReveal({ children, className, stagger? }: { children: string; className?: string; stagger?: number })`

- [ ] **Step 1: Implement.** `"use client"`. Split `children` into words; each word a `motion.span` going opacity 0.18→1 and y small, driven by `whileInView` with `staggerChildren`. Preserve `aria-label={children}`. Reduced motion → full opacity static.
- [ ] **Step 2: Render check** on a program detail; build; revert.
- [ ] **Step 3: Commit** `feat: add ScrollReveal primitive`.

### Task 5: ShinyText

**Files:**
- Create: `components/reactbits/shiny-text.tsx`

**Interfaces:**
- Produces: `ShinyText({ children, className, speed? }: { children: string; className?: string; speed?: number })`

- [ ] **Step 1: Implement.** Pure CSS sheen: a `background-clip:text` gradient (foreground → brand-glow → foreground) with an animated `background-position`. Define keyframes inline `<style>` like `MediaPlaceholder` does. Reduced motion handled by global CSS reduce block (animation paused).
- [ ] **Step 2: Render check** on strength-club creed; build; revert.
- [ ] **Step 3: Commit** `feat: add ShinyText primitive`.

### Task 6: AnimatedList

**Files:**
- Create: `components/reactbits/animated-list.tsx`

**Interfaces:**
- Produces: `AnimatedList({ items, className, itemClassName, renderItem? }: { items: React.ReactNode[]; className?: string; itemClassName?: string; renderItem?: (node: React.ReactNode, i: number) => React.ReactNode })`
  - Default render wraps each item in a row with a brand bullet, matching existing get/don't list markup.

- [ ] **Step 1: Implement.** `"use client"`. Container `motion.ul` with `whileInView` + `staggerChildren`; each `motion.li` fades+slides x from -8px. Reduced motion → static list. Keep markup compatible with current `<li>` bullet rows.
- [ ] **Step 2: Render check** on strength-club get list; build; revert.
- [ ] **Step 3: Commit** `feat: add AnimatedList primitive`.

### Task 7: Carousel

**Files:**
- Create: `components/reactbits/carousel.tsx`

**Interfaces:**
- Produces: `Carousel({ children, className }: { children: React.ReactNode[]; className?: string })`

- [ ] **Step 1: Implement.** `"use client"`. Horizontal `motion.div` with `drag="x"`, `dragConstraints` computed from content width via ref + `useEffect`/`ResizeObserver`. Snap to nearest slide on `onDragEnd` using velocity. Dot indicators below; clicking a dot animates `x`. Keyboard arrows move slides. Reduced motion → horizontal scroll container with `overflow-x-auto`, no drag.
- [ ] **Step 2: Render check** on testimonials; build; revert.
- [ ] **Step 3: Commit** `feat: add Carousel primitive`.

### Task 8: Stepper progress line

**Files:**
- Create: `components/reactbits/step-progress.tsx`

**Interfaces:**
- Produces: `StepProgress({ steps, className }: { steps: { step: string; title: string; body: string }[]; className?: string })`

- [ ] **Step 1: Implement.** `"use client"`. Renders the existing 3-up grid but adds an absolutely-positioned connecting line (horizontal on desktop, vertical on mobile) whose lime fill scaleX/scaleY is driven by `useScroll`+`useTransform` over the section. Each step number pops (`scale` spring) as the fill passes it. Reduced motion → full static line, numbers static.
- [ ] **Step 2: Render check** on strength-club; build; revert.
- [ ] **Step 3: Commit** `feat: add StepProgress primitive`.

### Task 9: SquaresBackground

**Files:**
- Create: `components/reactbits/squares-bg.tsx`

**Interfaces:**
- Produces: `SquaresBackground({ className, cell?, opacity? }: { className?: string; cell?: number; opacity?: number })`

- [ ] **Step 1: Implement.** `"use client"`. A `<canvas>` (or pure CSS grid mask) drawing a faint moving grid of hairlines that drifts slowly; absolute, `-z-10`, `pointer-events-none`. Default `opacity` ~0.04, brand-tinted on a few random cells. Reduced motion → static grid (no rAF loop). Stop rAF on unmount.
- [ ] **Step 2: Render check** behind RUSH models band; build; revert.
- [ ] **Step 3: Commit** `feat: add SquaresBackground primitive`.

### Task 10: Barrel export + reduced-motion audit

**Files:**
- Create: `components/reactbits/index.ts`

- [ ] **Step 1:** Export all primitives from `index.ts`.
- [ ] **Step 2:** Grep each file for a reduced-motion branch; add any missing.
- [ ] **Step 3:** `npm run lint && npm run build`. Expected: pass.
- [ ] **Step 4: Commit** `feat: barrel export reactbits primitives + reduced-motion audit`.

---

## Phase 2 — Shared component upgrades

### Task 11: MediaPlaceholder `interactive` variant

**Files:**
- Modify: `components/media-placeholder.tsx`

**Interfaces:**
- Produces: adds optional `interactive?: boolean` prop. When true and motion allowed, wraps inner content in `TiltedCard` (glare on) and adds a slow parallax drift to the hatch layer. Default false = current behavior byte-for-byte.

- [ ] **Step 1:** Add the prop; when false, render exactly as today (no behavioral change). When true, wrap with `TiltedCard`. Keep it a client-safe split (extract an inner `InteractiveMedia` client component if needed; base stays server).
- [ ] **Step 2:** `npm run build`. Confirm existing pages unchanged.
- [ ] **Step 3: Commit** `feat: add interactive variant to MediaPlaceholder`.

### Task 12: Callout glow-border variant

**Files:**
- Modify: `components/sections/callout.tsx`

**Interfaces:**
- Produces: adds optional `glow?: boolean`. When true, adds an animated conic/gradient border sheen around the box (CSS keyframe, brand-tinted, subtle). Default false = current look.

- [ ] **Step 1:** Implement glow variant behind the flag; keep `Reveal` wrapper.
- [ ] **Step 2:** `npm run build`.
- [ ] **Step 3: Commit** `feat: add glow variant to Callout`.

### Task 13: Nav cards → SpotlightCard + magnetic arrows

**Files:**
- Modify: `components/sections/sibling-nav.tsx`
- Modify: `components/sections/model-nav.tsx`
- Modify: `components/sections/link-list.tsx`

**Interfaces:**
- `SiblingNav` / `ModelNav`: wrap each card body in `SpotlightCard`, keep the `<Link>` and existing classes; arrow gets a small `Magnetic`/translate flourish. `LinkList`: add an animated underline that wipes in on hover (brand) + arrow slide. Public props unchanged.

- [ ] **Step 1:** Update `SiblingNav` — wrap card content in `SpotlightCard`, preserve grid borders/classes.
- [ ] **Step 2:** Update `ModelNav` similarly with a slightly different spotlight alpha (distinct feel).
- [ ] **Step 3:** Update `LinkList` — add hover underline wipe + arrow slide; no spotlight (keep it editorial, distinct from the grids).
- [ ] **Step 4:** `npm run build`. Confirm consumers (recovery, rush, programs) render.
- [ ] **Step 5: Commit** `feat: animate shared nav/list components`.

---

## Phase 3 — Per-page signatures (highest traffic first)

> Each task: edit only the named page, compose primitives per the design table, build, commit. Keep copy/layout intact.

### Task 14: Membership
**Files:** Modify `app/membership/page.tsx`
- [ ] **Step 1:** Animate `AccessLadder` rungs to spring-fill width/opacity on `whileInView` (stagger per rung). Extract the meter into a small client piece if the page must stay server; otherwise mark minimal client boundary.
- [ ] **Step 2:** Wrap the highlighted tier card in `SpotlightCard` (others keep current hover recede). Render the feature `<ul>` via `AnimatedList`; emphasised feature pulses once on reveal.
- [ ] **Step 3:** `npm run build`; reduced-motion check. **Commit** `feat: animate membership page`.

### Task 15: Strength Club
**Files:** Modify `app/strength-club/page.tsx`
- [ ] **Step 1:** Replace how-it-works grid with `StepProgress` (same content from `strength.howItWorks`).
- [ ] **Step 2:** Render get/don't lists via `AnimatedList`; wrap the creed accent word in `ShinyText`.
- [ ] **Step 3:** build + reduced-motion. **Commit** `feat: animate strength-club page`.

### Task 16: Recovery index
**Files:** Modify `app/recovery/page.tsx`
- [ ] **Step 1:** Contrast block: add hot↔cold split reveal on "Heat. Cold. Repeat." (warm→cool gradient wipe via `motion` on scroll). Add one new `MediaPlaceholder interactive` slot in the contrast grid.
- [ ] **Step 2:** bring-list and first-timers lists → `AnimatedList`. (SiblingNav already upgraded in Task 13.)
- [ ] **Step 3:** build + reduced-motion. **Commit** `feat: animate recovery index page`.

### Task 17: RUSH index
**Files:** Modify `app/rush/page.tsx`
- [ ] **Step 1:** Add `SquaresBackground` behind the models band (isolated/relative wrapper). Model name → reveal with a brief scramble/decrypt-in (small local helper using `motion`/interval; reduced motion → plain).
- [ ] **Step 2:** "N formats" → `CountUp` with suffix " formats".
- [ ] **Step 3:** build + reduced-motion. **Commit** `feat: animate rush index page`.

### Task 18: Coaches
**Files:** Modify `app/training/coaches/page.tsx`
- [ ] **Step 1:** Portrait `MediaPlaceholder` → `interactive` (TiltedCard). Name/title placeholders cross-fade up on reveal (stagger).
- [ ] **Step 2:** build + reduced-motion. **Commit** `feat: animate coaches page`.

### Task 19: Testimonials
**Files:** Modify `app/training/testimonials/page.tsx`
- [ ] **Step 1:** Replace the 2-col grid with `Carousel` of the placeholder testimonial cards; add a large quote-mark flourish and a lime ring trace on the active card.
- [ ] **Step 2:** build + reduced-motion (scroll fallback). **Commit** `feat: animate testimonials page`.

### Task 20: Amenities
**Files:** Modify `app/amenities/page.tsx`
- [ ] **Step 1:** Wrap each amenity cell in `SpotlightCard`; index `01–NN` → `CountUp pad={2}`; hairline border draws on hover.
- [ ] **Step 2:** build + reduced-motion. **Commit** `feat: animate amenities page`.

### Task 21: Programs (detail shared layout)
**Files:** Modify `components/sections/program-detail.tsx`
- [ ] **Step 1:** Statement paras → `ScrollReveal`. `LinkList` already upgraded; pass any variant prop if added. Confirm all 5 program pages still render (they consume `ProgramDetail`).
- [ ] **Step 2:** build. **Commit** `feat: animate program detail layout`.

### Task 22: Recovery detail + Training index + remainder
**Files:** Modify `components/sections/recovery-detail.tsx`, `app/training/page.tsx`, and light touches to `app/first-timers/page.tsx`, `app/club-standards/page.tsx`, `app/faq/page.tsx`, `app/contact/page.tsx`
- [ ] **Step 1:** RecoveryDetail: `Callout glow`, statement → `ScrollReveal`, one interactive media slot.
- [ ] **Step 2:** Training index: add a `CountUp` stat row (if stats exist in content; else skip), `Callout glow`.
- [ ] **Step 3:** Light pages: `ScrollReveal` on lead lines, `SpotlightCard` on any existing cards, keep calm.
- [ ] **Step 4:** build all. **Commit** `feat: animate recovery-detail, training, and lighter pages`.

---

## Phase 4 — Final pass

### Task 23: Reduced-motion, mobile, perf
- [ ] **Step 1:** Toggle OS reduce-motion; load each interior page; confirm static fallbacks, no jank.
- [ ] **Step 2:** Confirm heavy effects (SquaresBackground canvas, Carousel) lazy-mount / cleanup rAF/observers on unmount.
- [ ] **Step 3:** Mobile widths: verify no horizontal overflow from spotlight/tilt/carousel.
- [ ] **Step 4:** `npm run lint && npm run build` clean. **Commit** `chore: reduced-motion, mobile, and perf pass`.

---

## Self-Review notes

- Spec coverage: every page in the design table maps to a Task in Phase 3; every primitive in the design maps to a Task in Phase 1; shared upgrades → Phase 2. Placeholders strategy → Task 11. Landing/header/footer untouched (Global Constraints).
- Verification adapted to a repo with no test runner: lint + build + render/reduced-motion checks (documented in Global Constraints).
