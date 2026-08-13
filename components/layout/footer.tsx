import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { site } from "@/content/site";
import { navGroups, primaryCta } from "@/content/nav";
import { Placeholder } from "@/components/placeholder";
import { MapSnippet } from "@/components/map-snippet";
import { Marquee } from "@/components/motion/marquee";
import { cn } from "@/lib/utils";

const socialIcon = {
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  Twitter: FaXTwitter,
} as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink-900">
      {/* Signature marquee band — a slow, editorial ticker */}
      <div className="border-b border-border py-8 sm:py-12">
        <div className="[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <Marquee durationSeconds={48} gap="2.75rem">
            {site.signatureWords.map((w, i) => (
              <span key={w} className="flex items-center gap-11">
                <span
                  className={cn(
                    "display text-2xl uppercase tracking-[0.22em] sm:text-3xl",
                    i % 2 === 0 ? "marquee-ghost" : "text-foreground/70",
                  )}
                >
                  {w}
                </span>
                <span className="text-[0.5rem] text-brand" aria-hidden>
                  ●
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Two rows: the brand card and the map share the top row as equal halves,
          and the three lists sit together on the row beneath. Mobile keeps the
          lists side by side (two columns) so the footer stays short. */}
      <div className="container-grit grid gap-y-10 py-12 sm:gap-y-12 sm:py-16">
        {/* Top row — brand card and map, matched in width and height. */}
        <div className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10">
          {/* Brand card — the footer's anchor, lifted off the ground with its
              own panel, hairline accent and full-width CTA. */}
          <div className="relative flex flex-col border border-border bg-ink-800 p-5 sm:p-6 lg:p-7">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] bg-brand/70"
            />
            <p className="display text-2xl leading-none text-foreground">
              Grit Fit
            </p>
            <p className="mt-1.5 text-sm tracking-wide text-muted-foreground">
              Luxe Health Club
            </p>
            <span aria-hidden className="my-5 block h-px w-full bg-border" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Nothing is given. Everything is earned. Strength, RUSH, and
              Recovery under one roof in {site.location.area}.
            </p>
            {/* mt-auto pins the CTA to the card's foot so it lines up with the
                bottom edge of the map beside it; pt-6 floors the gap. */}
            <div className="mt-6 sm:mt-auto sm:pt-6">
              <Link
                href={primaryCta.href}
                className="btn btn-solid w-full px-5 py-3"
              >
                {primaryCta.label}
              </Link>
            </div>
          </div>

          {/* Location — the top row's other half, matched to the brand card. */}
          <MapSnippet
            variant="band"
            area={site.location.neighborhood}
            city={site.location.city}
            coordinates={site.location.coordinates}
            mapsUrl={site.location.mapsUrl}
          />
        </div>

        {/* The three lists — one row, one shared baseline. Two columns on
            mobile (Explore beside Hours, Contact beneath) so the footer doesn't
            run long; three from `sm` up. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-10">
          <FooterCol title="Explore" className="order-1 sm:order-none">
            {navGroups.map((g) => (
              <FooterLink key={g.href} href={g.href}>
                {g.label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* On mobile the contact details and the socials sit side by side in
              the full-width cell; from `sm` up they stack in one column. */}
          <div className="order-3 col-span-2 flex flex-wrap items-start justify-between gap-x-8 gap-y-6 sm:order-none sm:col-span-1 sm:block">
            <FooterCol title="Contact" className="flex-1">
              <li className="text-sm">
                {site.contact.email.placeholder ? (
                  <Placeholder label="Email" className="text-xs">
                    {site.contact.email.value}
                  </Placeholder>
                ) : (
                  <a href={`mailto:${site.contact.email.value}`}>
                    {site.contact.email.value}
                  </a>
                )}
              </li>
              <li className="text-sm">
                {site.contact.phone.placeholder ? (
                  <Placeholder label="Phone" className="text-xs">
                    {site.contact.phone.value}
                  </Placeholder>
                ) : (
                  site.contact.phone.value
                )}
              </li>
              <li className="text-sm text-muted-foreground">
                {site.contact.address.placeholder ? (
                  <Placeholder label="Address" className="text-xs">
                    {site.contact.address.value}
                  </Placeholder>
                ) : (
                  site.contact.address.value
                )}
              </li>
            </FooterCol>

            {/* Socials sit apart from the contact list so the dashed
                placeholder chips read as one group and the icons as another. */}
            <ul className="flex gap-2.5 sm:mt-6">
              {site.socials.map((s) => {
                const Icon = socialIcon[s.label as keyof typeof socialIcon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      title={`${s.label} — link pending`}
                      className="inline-flex size-9 items-center justify-center rounded-none border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                    >
                      {Icon ? <Icon className="size-4" /> : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Hours — day on the left, time on the right, one tidy row each. */}
          <FooterCol title="Hours" className="order-2 sm:order-none">
            {site.hours.map((h) => (
              <li
                key={h.days}
                className="flex max-w-[15rem] flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-sm"
              >
                <span className="text-foreground">{h.days}</span>
                {h.placeholder ? (
                  <Placeholder label="Hours" className="text-xs">
                    {h.time}
                  </Placeholder>
                ) : (
                  <span className="text-muted-foreground">{h.time}</span>
                )}
              </li>
            ))}
          </FooterCol>
        </div>
      </div>

      <div className="container-grit flex flex-col items-center justify-between gap-3 border-t border-border py-5 text-center text-xs text-muted-foreground sm:flex-row sm:py-6 sm:text-left">
        <p>© {new Date().getFullYear()} Grit Fit — Luxe Health Club. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/club-standards" className="hover:text-foreground">
            Club Standards
          </Link>
          <Link href="/faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link href="/first-timers" className="hover:text-foreground">
            First Timers
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
