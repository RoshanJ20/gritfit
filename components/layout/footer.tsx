import Image from "next/image";
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

      {/* Top row: brand card + logo. Bottom row: the three lists on one shared
          baseline. The map spans both rows on the right. Every block is placed
          on the grid directly — rather than nested inside flex stacks — which
          is what keeps the row baselines honest when block heights differ. */}
      {/* The outer columns are deliberately equal (1fr … 1fr): the middle
          column's midpoint only lands on the container's midpoint when they
          match, which is what keeps the logo truly centred in the footer. */}
      {/* On mobile the logo leads as a masthead, then the brand card; below that
          Explore and Hours pair up as two short columns with Contact spanning
          the full width beneath them. From `sm` up this is the original grid. */}
      <div className="container-grit grid gap-x-10 gap-y-10 py-12 sm:grid-cols-2 sm:grid-rows-[auto_1fr] sm:gap-y-12 sm:py-16 lg:grid-cols-[1fr_0.85fr_1fr] lg:gap-x-14">
        {/* Brand card — the footer's anchor, lifted off the ground with its own
            panel, hairline accent and full-width CTA. */}
        <div className="relative border border-border bg-ink-800 p-5 sm:col-start-1 sm:row-start-1 sm:p-6 lg:p-7">
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
            Nothing is given. Everything is earned. Strength, RUSH, and Recovery
            under one roof in {site.location.area}.
          </p>
          <Link
            href={primaryCta.href}
            className="btn btn-solid mt-6 w-full px-5 py-3"
          >
            {primaryCta.label}
          </Link>
        </div>

        {/* Logo — centred in the top row beside the brand card. */}
        <div className="order-first flex items-center justify-center sm:order-none sm:col-start-2 sm:row-start-1 lg:col-start-2">
          <Link
            href="/"
            aria-label="Grit Fit — home"
            className="block w-full max-w-[9rem] transition-opacity duration-300 hover:opacity-80 sm:max-w-[13rem]"
          >
            <Image
              src="/logo.png"
              alt="Grit Fit — Luxe Health Club"
              width={500}
              height={499}
              sizes="(min-width: 768px) 13rem, 40vw"
              className="h-auto w-full"
            />
          </Link>
        </div>

        {/* The three lists — one row, one baseline, in their own nested grid so
            they divide the space left of the map evenly. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:col-span-2 sm:col-start-1 sm:row-start-2 sm:grid-cols-3 lg:col-span-2 lg:gap-x-10">
          <FooterCol title="Explore" className="order-1 sm:order-none">
            {navGroups.map((g) => (
              <FooterLink key={g.href} href={g.href}>
                {g.label}
              </FooterLink>
            ))}
          </FooterCol>

          <div className="order-3 col-span-2 sm:order-none sm:col-span-1">
            <FooterCol title="Contact">
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
            <ul className="mt-6 flex gap-2.5">
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

        {/* Location — fills the height of both rows */}
        <MapSnippet
          variant="band"
          area={site.location.neighborhood}
          city={site.location.city}
          coordinates={site.location.coordinates}
          mapsUrl={site.location.mapsUrl}
          className="sm:col-span-2 sm:col-start-1 sm:row-start-3 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1"
        />
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
