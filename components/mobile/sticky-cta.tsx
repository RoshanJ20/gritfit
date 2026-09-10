"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn, whatsappUrl } from "@/lib/utils";
import { site } from "@/content/site";
import { primaryCta } from "@/content/nav";

/* Same behaviour as the header's "Join Club": open WhatsApp with the join
   message prefilled, rather than routing to /membership. */
const joinHref = whatsappUrl(site.whatsapp.joinMessage);
const chatHref = whatsappUrl();

/**
 * Mobile-only sticky conversion bar.
 *
 * It is the mobile counterpart to the desktop WhatsApp FAB (which is hidden
 * below `lg` — the two never show together). The bar keeps the primary action a
 * thumb-reach away through the whole scroll, which is the point of the
 * info→CTA flow on a phone.
 *
 * Two rules keep it from getting in the way:
 *  - it stays hidden until the reader is past the first screen, so it never
 *    competes with the hero;
 *  - it retracts again as the footer comes into view, so it never covers the
 *    footer's own links and CTAs.
 *
 * Performance: one passive scroll listener that only flips a boolean (the same
 * pattern the FAB already used) plus one IntersectionObserver on the footer —
 * no scroll-driven layout, no animation beyond transform/opacity.
 *
 * z-40 sits under the nav sheet (z-50) and the skip link (z-100).
 */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 400;
      setPastHero((prev) => (prev === past ? prev : past));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      // Trigger a little before the footer's top edge reaches the bar.
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const shown = pastHero && !atFooter;

  return (
    <div
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 lg:hidden",
        "border-t border-border bg-ink-900/92 backdrop-blur-xl",
        "px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
        "flex items-center gap-2.5",
        "transition-[transform,opacity] duration-300 ease-out",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <a
        href={joinHref}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={shown ? 0 : -1}
        className="btn btn-solid h-12 flex-1 px-5"
      >
        {primaryCta.label}
      </a>
      <a
        href={chatHref}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={shown ? 0 : -1}
        aria-label={`Chat with Grit Fit on WhatsApp at ${site.whatsapp.display}`}
        className="inline-flex size-12 shrink-0 items-center justify-center border border-border bg-ink-800 text-brand transition-colors hover:border-brand/50"
      >
        <FaWhatsapp aria-hidden className="size-6" />
      </a>
    </div>
  );
}
