import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { site } from "@/content/site";
import { navGroups, primaryCta } from "@/content/nav";
import { Placeholder } from "@/components/placeholder";
import { Marquee } from "@/components/motion/marquee";

const socialIcon = {
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  Twitter: FaXTwitter,
} as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink-900">
      {/* Signature marquee band */}
      <div className="border-b border-border py-6">
        <Marquee durationSeconds={28}>
          {site.signatureWords.map((w) => (
            <span
              key={w}
              className="display flex items-center gap-8 text-4xl text-foreground/80 sm:text-5xl"
            >
              {w}
              <span className="text-brand">/</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-grit grid grid-cols-2 gap-10 py-16 md:grid-cols-4 lg:gap-12">
        {/* Brand + CTA */}
        <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
          <p className="display text-2xl leading-none text-foreground">
            Grit Fit
            <span className="mt-1 block text-sm font-normal tracking-wide text-muted-foreground">
              The Luxe Club
            </span>
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Nothing is given. Everything is earned. Strength, RUSH, and Recovery
            under one roof in {site.location.area}.
          </p>
          <Link href={primaryCta.href} className="btn btn-solid w-fit px-5 py-2.5">
            {primaryCta.label}
          </Link>
        </div>

        {/* Explore */}
        <FooterCol title="Explore">
          {navGroups.map((g) => (
            <FooterLink key={g.href} href={g.href}>
              {g.label}
            </FooterLink>
          ))}
        </FooterCol>

        {/* Hours */}
        <FooterCol title="Hours">
          {site.hours.map((h) => (
            <li key={h.days} className="text-sm text-muted-foreground">
              <span className="block text-foreground">{h.days}</span>
              {h.placeholder ? (
                <Placeholder label="Hours" className="mt-1 text-xs">
                  {h.time}
                </Placeholder>
              ) : (
                h.time
              )}
            </li>
          ))}
        </FooterCol>

        {/* Contact */}
        <FooterCol title="Contact">
          <li className="text-sm">
            {site.contact.email.placeholder ? (
              <Placeholder label="Email">{site.contact.email.value}</Placeholder>
            ) : (
              <a href={`mailto:${site.contact.email.value}`}>
                {site.contact.email.value}
              </a>
            )}
          </li>
          <li className="text-sm">
            {site.contact.phone.placeholder ? (
              <Placeholder label="Phone">{site.contact.phone.value}</Placeholder>
            ) : (
              site.contact.phone.value
            )}
          </li>
          <li className="text-sm text-muted-foreground">
            {site.contact.address.placeholder ? (
              <Placeholder label="Address">
                {site.contact.address.value}
              </Placeholder>
            ) : (
              site.contact.address.value
            )}
          </li>
          <li className="mt-3 flex gap-3">
            {site.socials.map((s) => {
              const Icon = socialIcon[s.label as keyof typeof socialIcon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={`${s.label} — link pending`}
                  className="inline-flex size-9 items-center justify-center rounded-none border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {Icon ? <Icon className="size-4" /> : null}
                </a>
              );
            })}
          </li>
        </FooterCol>
      </div>

      <div className="container-grit flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Grit Fit — The Luxe Club. All rights reserved.</p>
        <div className="flex gap-5">
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
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
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
