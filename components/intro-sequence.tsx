"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "gf-intro-seen";

/** Hard ceiling. A preloader that can outstay its welcome is worse than none. */
const MAX_HOLD_MS = 2200;

/**
 * Decides, during HTML parse, whether the curtain runs at all — before the
 * browser has painted anything.
 *
 * This has to be a blocking inline script rather than an effect. By the time
 * React hydrates the page has already painted, so a returning visitor would
 * see the content, then a flash of black, then the content again. Deciding
 * synchronously means the overlay is either shown or `display: none` from the
 * very first paint.
 *
 * The flag is a data attribute, NOT a class, and that distinction is load
 * bearing. The root layout server-renders `className` on <html>, so React owns
 * that attribute and rewrites it on hydration — a class added here is silently
 * dropped a few hundred milliseconds later, which strands the overlay and
 * leaves the hero wordmark waiting for a lift that never comes. React only
 * touches attributes it rendered, and it never renders this one.
 */
const DECIDE = `(function(){try{var d=document.documentElement;var skip=location.pathname!=="/"||sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches;d.setAttribute("data-gf-intro",skip?"skip":"run")}catch(e){document.documentElement.setAttribute("data-gf-intro","skip")}})()`;

/**
 * The club's first three seconds.
 *
 * A black hold with one brand hairline growing left to right and a monospace
 * counter, then the black lifts as a mask from the bottom while the hero
 * wordmark rises into place underneath it — one continuous move rather than a
 * loader that disappears and a page that then begins.
 *
 * The bar is not theatre: it gates on the webfonts being ready and the hero
 * video reaching `readyState >= 3` (enough data to play through), so it
 * genuinely means the club is ready to be looked at. It is capped regardless.
 *
 * Shown once per session, only on the home route, and never under reduced
 * motion — all three decided by the inline script above.
 */
export function IntroSequence() {
  const [state, setState] = useState<"run" | "lift" | "gone">("run");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    // Nothing to drive. The overlay is already `display: none` — it only
    // shows for the "run" and "lifting" states — so we leave it inert rather
    // than calling setState synchronously here to unmount a hidden element.
    if (root.dataset.gfIntro !== "run") return;

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private mode — the intro simply plays again next time.
    }

    let done = false;
    const timers: number[] = [];

    // Creep toward 90 while waiting, so the bar reflects real waiting rather
    // than a scripted duration, then close the last stretch on readiness.
    const creep = window.setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.max(1, (90 - p) * 0.08)));
    }, 60);

    const finish = () => {
      if (done) return;
      done = true;
      window.clearInterval(creep);
      setProgress(100);

      timers.push(
        window.setTimeout(() => {
          setState("lift");
          // "lifting" rather than "skip": the overlay has to stay displayed
          // while its mask animates out. It unmounts itself when that
          // finishes. This also releases the scroll lock and un-suppresses the
          // wordmark's scroll-driven exit.
          root.dataset.gfIntro = "lifting";
          window.dispatchEvent(new Event("gf:intro-lift"));
        }, 260),
      );
      // Matches the lift animation in globals.css, then unmounts entirely.
      timers.push(window.setTimeout(() => setState("gone"), 260 + 1000));
    };

    const ready: Promise<unknown>[] = [];
    const fonts = document.fonts as FontFaceSet | undefined;
    if (fonts?.ready) ready.push(fonts.ready);

    const video = document.querySelector("video");
    if (video && video.readyState < 3) {
      ready.push(
        new Promise<void>((resolve) => {
          const on = () => resolve();
          video.addEventListener("canplay", on, { once: true });
          video.addEventListener("error", on, { once: true });
        }),
      );
    }

    Promise.all(ready).then(finish);
    timers.push(window.setTimeout(finish, MAX_HOLD_MS));

    return () => {
      window.clearInterval(creep);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: DECIDE }} />
      {state !== "gone" && (
        <div
          className="intro-overlay"
          data-state={state}
          aria-hidden
          // The page behind is inert for at most 2.2s; nothing here is
          // interactive, so it is hidden from assistive tech rather than
          // announced as a loading region.
          style={
            { "--intro-progress": progress / 100 } as React.CSSProperties
          }
        >
          <span className="intro-count">
            {String(Math.round(progress)).padStart(3, "0")}
          </span>
          <span className="intro-bar">
            <i />
          </span>
        </div>
      )}
    </>
  );
}
