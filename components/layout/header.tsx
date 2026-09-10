"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Menu } from "lucide-react";

import { navGroups, primaryCta, secondaryCta, type NavGroup } from "@/content/nav";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";

/* "Join Club" opens WhatsApp with a short prefilled message rather than
   routing to /membership — same behaviour as the bottom-of-page CTAs. */
const joinHref = whatsappUrl(site.whatsapp.joinMessage);
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Mobile only: the bar retracts on scroll-down and returns on scroll-up, the
  // way a native app reclaims the reading area. `lg:translate-y-0` below pins it
  // permanently open on desktop, so this state never affects the desktop header.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const goingDown = y > lastY.current;
    // Only retract once clear of the bar's own height, never at the very top.
    if (goingDown && y > 140) setHidden(true);
    else if (!goingDown) setHidden(false);
    lastY.current = y;
  });

  // Keep the bar present whenever the menu is open.
  const collapsed = hidden && !mobileOpen;

  const leftGroups = navGroups.filter((g) => g.side === "left");
  const rightGroups = navGroups.filter((g) => g.side === "right");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out lg:translate-y-0",
        collapsed ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-b border-border bg-ink-900/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-grit grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-20">
        {/* ---------- Left ---------- */}
        <nav className="hidden items-center justify-start gap-1 lg:flex">
          {leftGroups.map((group) => (
            <NavItem key={group.label} group={group} pathname={pathname} align="left" />
          ))}
        </nav>
        {/* Mobile: burger (left) */}
        <div className="flex items-center lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="-ml-2 inline-flex size-11 items-center justify-center rounded-md text-foreground"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full border-border bg-ink-900 data-[side=left]:w-full sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-14">
                <p className="eyebrow mb-6">Menu</p>
                <nav className="w-full">
                  {/* Every group is a direct link to its page — no accordions on
                      mobile; sub-pages are reached from the section page itself. */}
                  {navGroups.map((group) => (
                    <Link
                      key={group.label}
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="display group flex items-center justify-between border-b border-border py-4 text-2xl text-foreground transition-colors hover:text-brand"
                    >
                      <span>{group.label}</span>
                      <span
                        aria-hidden
                        className="-translate-x-1 text-base text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </nav>
                {/* Pinned to the foot: the primary WhatsApp join, with the
                    assessment as a quieter second option. */}
                <div className="mt-auto pt-8">
                  <a
                    href={joinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-solid w-full px-5 py-4"
                  >
                    {primaryCta.label}
                  </a>
                  <Link
                    href={secondaryCta.href}
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 block text-center text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {`Or ${secondaryCta.label.toLowerCase()}`}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* ---------- Center wordmark ---------- */}
        <Link
          href="/"
          className="flex shrink-0 items-center justify-center"
          aria-label="Grit Fit — home"
        >
          {/* Path is absolute from `public/` — Next serves static files only
              from there, and next/image needs the leading slash. The
              width/height are the file's real pixel dimensions; they set the
              aspect ratio the browser reserves before the image loads, so they
              have to match or the header shifts on first paint. */}
          <Image
            src="/images/finalgritfitlogo.png"
            alt="Grit Fit — Luxe Health Club"
            width={913}
            height={238}
            priority
            className="h-7 w-auto transition-opacity hover:opacity-80 sm:h-8 lg:h-11"
          />
        </Link>

        {/* ---------- Right ---------- */}
        <nav className="hidden items-center justify-end gap-1 lg:flex">
          {rightGroups.map((group) => (
            <NavItem key={group.label} group={group} pathname={pathname} align="right" />
          ))}
          <a
            href={joinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid ml-3 px-5 py-2.5"
          >
            {primaryCta.label}
          </a>
        </nav>
        {/* Mobile: Join (right) — keeps the logo optically centered */}
        <div className="flex items-center justify-end lg:hidden">
          <a
            href={joinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="-mr-2 inline-flex h-11 items-center px-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground"
          >
            Join
          </a>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  group,
  pathname,
  align,
}: {
  group: NavGroup;
  pathname: string;
  align: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const active = pathname.startsWith(group.href) && group.href !== "/";
  const hasMenu = group.links.length > 1;

  return (
    <div
      className="group/nav relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={group.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative block px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
          active || open
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {group.label}
        {/* Active-page underline — also wipes in on hover for any item. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ease-out",
            active
              ? "scale-x-100"
              : "scale-x-0 group-hover/nav:scale-x-100",
          )}
        />
      </Link>

      <AnimatePresence>
        {hasMenu && open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute top-full z-10 mt-2 min-w-56 overflow-hidden rounded-md border border-border bg-ink-900/95 p-1.5 shadow-2xl backdrop-blur-xl",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            {group.links.map((link) => {
              const linkActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group/link flex items-center justify-between gap-4 rounded-sm px-3 py-2 text-sm font-medium text-foreground transition-colors",
                    linkActive ? "bg-ink-700" : "hover:bg-ink-700",
                  )}
                >
                  {link.label}
                  <span className="text-brand opacity-0 transition-all group-hover/link:translate-x-0.5 group-hover/link:opacity-100">
                    →
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
