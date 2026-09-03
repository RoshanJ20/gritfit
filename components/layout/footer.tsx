import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { site } from "@/content/site";
import { navGroups } from "@/content/nav";
import { Placeholder } from "@/components/placeholder";
import { Marquee } from "@/components/motion/marquee";
import { cn } from "@/lib/utils";

const socialIcon = {
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  Twitter: FaXTwitter,
} as const;

/** Micro-caps field label. Muted, not brand — the green is kept for the
 *  section eyebrows so the footer has one accent level, not two competing. */
const fieldLabel =
  "text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/60";

export function Footer() {
  const [instagram, ...pendingSocials] = site.socials;

  return (
    <footer className="relative border-t border-border bg-ink-900">
      {/* Signature marquee band — a slow, editorial ticker */}
      <div className="border-b border-border py-4 sm:py-5">
        <div className="[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <Marquee durationSeconds={48} gap="2rem">
            {site.signatureWords.map((w, i) => (
              <span key={w} className="flex items-center gap-8">
                <span
                  className={cn(
                    "display text-xl uppercase tracking-[0.22em] sm:text-2xl",
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

      {/* One divided band of four equal cells: the identity card, then Explore,
          Contact and Follow. The card keeps its highlight — a filled panel with
          the brand rule across the top — so it still anchors the footer even
          though it now shares the row, and the width, with the link columns.
          The card is laid out as a spec sheet: a wordmark lockup, then
          label/value rows separated by rules that run the full width of the
          cell. Those full-bleed rules are what make it read as a printed card
          rather than a div with text in it. */}
      <div className="container-grit py-8 sm:py-10">
        <div className="grid border border-border lg:grid-cols-4">
          <div className="relative flex flex-col overflow-hidden bg-ink-800 p-5 lg:p-6">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] bg-brand/70"
            />

            {/* Wordmark lockup */}
            <div>
              <p className="display text-2xl uppercase leading-none tracking-[0.04em] text-foreground lg:text-3xl">
                Grit Fit
              </p>
              <p className="mt-2.5 flex items-center gap-2.5">
                <span className="h-px w-6 bg-brand" aria-hidden />
                <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  Luxe Health Club
                </span>
              </p>
            </div>

            <FieldRow label="Address" className="mt-5">
              {site.contact.address.placeholder ? (
                <Placeholder label="Address" className="text-xs">
                  {site.contact.address.value}
                </Placeholder>
              ) : (
                <span className="text-sm leading-relaxed text-foreground">
                  {site.contact.address.value}
                </span>
              )}
            </FieldRow>

            {/* mt-auto floors the hours block so the card's last rule lines up
                with the bottom edge of the map beside it. */}
            <FieldRow label="Hours" className="mt-auto pt-5">
              <ul className="flex flex-col gap-2">
                {site.hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex items-start justify-between gap-6 text-sm"
                  >
                    <span className="text-foreground">{h.days}</span>
                    {h.placeholder ? (
                      <Placeholder label="Hours" className="text-xs">
                        {h.times.join(" · ")}
                      </Placeholder>
                    ) : (
                      <span className="flex flex-col items-end gap-0.5 text-right tabular-nums text-muted-foreground">
                        {h.times.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </FieldRow>
          </div>

          {/* Explore — full-width link rows, each on its own hairline with a
              marker that slides in on hover, so the nav reads as a table of
              destinations instead of a stack of small grey words. */}
          <FooterCell title="Explore" divided>
            <ul>
              {navGroups.map((g) => (
                <li
                  key={g.href}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <Link
                    href={g.href}
                    className="group flex items-center justify-between gap-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{g.label}</span>
                    <span
                      aria-hidden
                      className="translate-x-1 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </FooterCell>

          <FooterCell title="Contact" divided>
            <dl className="flex flex-col gap-4">
              <div>
                <dt className={fieldLabel}>Email</dt>
                <dd className="mt-1.5 text-sm">
                  {site.contact.email.placeholder ? (
                    <Placeholder label="Email" className="text-xs">
                      {site.contact.email.value}
                    </Placeholder>
                  ) : (
                    <a
                      href={`mailto:${site.contact.email.value}`}
                      className="text-foreground transition-colors hover:text-brand"
                    >
                      {site.contact.email.value}
                    </a>
                  )}
                </dd>
              </div>

              <div>
                <dt className={fieldLabel}>Phone</dt>
                <dd className="mt-1.5 text-sm">
                  {site.contact.phone.placeholder ? (
                    <Placeholder label="Phone" className="text-xs">
                      {site.contact.phone.value}
                    </Placeholder>
                  ) : (
                    <>
                      {/* The named contact labels the number beneath it, so a
                          member knows who picks up. */}
                      <span className="block text-muted-foreground">
                        Ask for {site.contact.name}
                      </span>
                      <a
                        href={`tel:${site.contact.phone.value.replace(/\s/g, "")}`}
                        className="mt-1 inline-block tabular-nums text-foreground transition-colors hover:text-brand"
                      >
                        {site.contact.phone.value}
                      </a>
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </FooterCell>

          {/* Follow — the live account gets a full row with its handle spelled
              out; the two accounts we don't have yet sit beneath as small
              marked buttons rather than three identical squares of which two
              lead nowhere. */}
          <FooterCell title="Follow" divided>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-border p-2.5 transition-colors hover:border-brand/60 hover:bg-brand/[0.05]"
            >
              <span className="flex size-8 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-brand/60 group-hover:text-brand">
                <FaInstagram className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn(fieldLabel, "block")}>Instagram</span>
                <span className="mt-0.5 block truncate text-sm text-foreground">
                  {instagram.handle}
                </span>
              </span>
              <span
                aria-hidden
                className="shrink-0 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
              >
                →
              </span>
            </a>

            <div className="mt-4">
              <p className={fieldLabel}>Also coming soon</p>
              <ul className="mt-2 flex gap-2.5">
                {pendingSocials.map((s) => {
                  const Icon = socialIcon[s.label as keyof typeof socialIcon];
                  return (
                    <li key={s.label}>
                      <span
                        aria-label={`${s.label} — link pending`}
                        title={`${s.label} — link pending`}
                        className="inline-flex size-8 items-center justify-center border border-dashed border-border text-muted-foreground/50"
                      >
                        {Icon ? <Icon className="size-4" /> : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FooterCell>
        </div>
      </div>

      {/* `flex-col-reverse` puts the legal links above the copyright line on
          mobile while the DOM (and the desktop row) keeps copyright first. */}
      <div className="container-grit flex flex-col-reverse items-center justify-between gap-3 border-t border-border py-5 text-center text-sm text-muted-foreground sm:flex-row sm:py-7 sm:text-left">
        <p>
          © {new Date().getFullYear()} Grit Fit — Luxe Health Club. All rights
          reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            href="/club-standards"
            className="transition-colors hover:text-foreground"
          >
            Club Standards
          </Link>
          <span aria-hidden className="text-border">
            /
          </span>
          <Link href="/faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
          <span aria-hidden className="text-border">
            /
          </span>
          <Link
            href="/first-timers"
            className="transition-colors hover:text-foreground"
          >
            First Timers
          </Link>
        </div>
      </div>
    </footer>
  );
}

/**
 * A label/value row inside the brand card. The rule above it is full-bleed —
 * pulled out to the card's edges with negative margins that cancel the card
 * padding — which is what gives the card its spec-sheet look.
 */
function FieldRow({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <span aria-hidden className="-mx-5 mb-4 block h-px bg-border lg:-mx-6" />
      <p className={cn(fieldLabel, "mb-2.5")}>{label}</p>
      {children}
    </div>
  );
}

/** One cell of the bottom band. `divided` draws the rule that separates it
 *  from the cell before — horizontal when stacked, vertical once side by side. */
function FooterCell({
  title,
  divided = false,
  children,
}: {
  title: string;
  divided?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "p-5 lg:p-6",
        divided && "border-t border-border lg:border-l lg:border-t-0",
      )}
    >
      <p className="eyebrow mb-4">{title}</p>
      {children}
    </div>
  );
}
