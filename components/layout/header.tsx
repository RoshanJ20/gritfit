"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Menu } from "lucide-react";

import { navGroups, primaryCta, type NavGroup } from "@/content/nav";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const leftGroups = navGroups.filter((g) => g.side === "left");
  const rightGroups = navGroups.filter((g) => g.side === "right");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-border bg-ink-900/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-grit grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-20">
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
              className="inline-flex size-10 items-center justify-center rounded-md text-foreground"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full border-border bg-ink-900 sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-12">
                <Accordion type="single" collapsible className="w-full">
                  {navGroups.map((group) =>
                    // Groups with sub-links expand; combined single-page groups
                    // (no sub-links) are a direct link to their page.
                    group.links.length > 1 ? (
                      <AccordionItem key={group.label} value={group.label}>
                        <AccordionTrigger className="display text-2xl hover:no-underline">
                          {group.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-1 pb-2">
                            {group.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-ink-700 hover:text-foreground"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        key={group.label}
                        href={group.href}
                        onClick={() => setMobileOpen(false)}
                        className="display flex border-b border-border py-4 text-2xl text-foreground transition-colors hover:text-brand"
                      >
                        {group.label}
                      </Link>
                    ),
                  )}
                </Accordion>
                <Link
                  href={primaryCta.href}
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-solid mt-8 w-full px-5 py-3.5"
                >
                  {primaryCta.label}
                </Link>
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
          <span className="display text-xl leading-none text-foreground transition-colors hover:text-brand lg:text-2xl">
            GRITFIT
          </span>
        </Link>

        {/* ---------- Right ---------- */}
        <nav className="hidden items-center justify-end gap-1 lg:flex">
          {rightGroups.map((group) => (
            <NavItem key={group.label} group={group} pathname={pathname} align="right" />
          ))}
          <Link href={primaryCta.href} className="btn btn-solid ml-3 px-5 py-2.5">
            {primaryCta.label}
          </Link>
        </nav>
        {/* Mobile: Join (right) — keeps the logo optically centered */}
        <div className="flex items-center justify-end lg:hidden">
          <Link
            href={primaryCta.href}
            className="text-xs font-medium uppercase tracking-[0.15em] text-foreground"
          >
            Join
          </Link>
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
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={group.href}
        className={cn(
          "block px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
          active || open
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {group.label}
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
