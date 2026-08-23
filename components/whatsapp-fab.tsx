"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn, whatsappUrl } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Floating WhatsApp button, pinned bottom-right above the fold furniture.
 *
 * Deliberately understated so it reads as a utility rather than an ad: it stays
 * a bare icon at rest and only reveals its "Chat with us" label on hover or
 * keyboard focus, so it occupies ~48px until someone reaches for it. It fades in
 * after a short scroll so it never competes with the hero on first paint.
 *
 * z-40 keeps it under the mobile nav sheet (z-50) and the skip link (z-100).
 */
export function WhatsappFab() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Grit Fit on WhatsApp at ${site.whatsapp.display}`}
      className={cn(
        "group fixed bottom-5 right-5 z-40 inline-flex items-center gap-0 rounded-full",
        "border border-white/12 bg-ink-800/85 py-3 pl-3 pr-3 text-foreground shadow-lg backdrop-blur",
        "transition-[opacity,transform,border-color,padding] duration-300 ease-out",
        "hover:border-brand/50 hover:pr-4 focus-visible:border-brand/50 focus-visible:pr-4",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <FaWhatsapp
        aria-hidden
        className="size-6 shrink-0 text-brand transition-transform duration-300 group-hover:scale-110"
      />
      <span
        aria-hidden
        className={cn(
          "max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0",
          "transition-[max-width,opacity,margin] duration-300 ease-out",
          "group-hover:ml-2 group-hover:max-w-[9rem] group-hover:opacity-100",
          "group-focus-visible:ml-2 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100",
        )}
      >
        Chat with us
      </span>
    </a>
  );
}
