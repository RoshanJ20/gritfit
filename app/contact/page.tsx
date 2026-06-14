import type { Metadata } from "next";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { site } from "@/content/site";
import { secondaryCta } from "@/content/nav";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "Visit — Book an Assessment",
  description:
    "Every first-time member begins with a complimentary assessment. Find Grit Fit in HRBR and book your starting line.",
};

const socialIcon = {
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  Twitter: FaXTwitter,
} as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title="Book an Assessment"
        lead={[
          "Every first-time member begins with a complimentary assessment. No pressure. No expectations. Just a clear starting line.",
        ]}
        mediaLabel="The Club"
      />

      {/* Contact details */}
      <section className="container-grit py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h2 className="display mt-4 text-display-2 max-w-[16ch]">
              Find us. Then earn it.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Memberships and assessments are handled in person at the club.
            </p>
            <Link
              href={secondaryCta.href}
              className="btn btn-solid mt-8 px-7 py-3.5"
            >
              {secondaryCta.label}
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {/* Location — real */}
              <div className="bg-ink-900 p-8">
                <dt className="eyebrow">Location</dt>
                <dd className="mt-4 text-lg text-foreground">
                  {site.location.area}
                </dd>
              </div>

              {/* Email */}
              <div className="bg-ink-900 p-8">
                <dt className="eyebrow">Email</dt>
                <dd className="mt-4 text-sm">
                  {site.contact.email.placeholder ? (
                    <Placeholder label="Email">
                      {site.contact.email.value}
                    </Placeholder>
                  ) : (
                    <a href={`mailto:${site.contact.email.value}`}>
                      {site.contact.email.value}
                    </a>
                  )}
                </dd>
              </div>

              {/* Phone */}
              <div className="bg-ink-900 p-8">
                <dt className="eyebrow">Phone</dt>
                <dd className="mt-4 text-sm">
                  {site.contact.phone.placeholder ? (
                    <Placeholder label="Phone">
                      {site.contact.phone.value}
                    </Placeholder>
                  ) : (
                    site.contact.phone.value
                  )}
                </dd>
              </div>

              {/* Address */}
              <div className="bg-ink-900 p-8">
                <dt className="eyebrow">Address</dt>
                <dd className="mt-4 text-sm text-muted-foreground">
                  {site.contact.address.placeholder ? (
                    <Placeholder label="Address">
                      {site.contact.address.value}
                    </Placeholder>
                  ) : (
                    site.contact.address.value
                  )}
                </dd>
              </div>

              {/* Hours */}
              <div className="bg-ink-900 p-8 sm:col-span-2">
                <dt className="eyebrow">Hours</dt>
                <dd className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-12">
                  {site.hours.map((h) => (
                    <div key={h.days} className="text-sm text-muted-foreground">
                      <span className="block text-foreground">{h.days}</span>
                      {h.placeholder ? (
                        <Placeholder label="Hours" className="mt-1 text-xs">
                          {h.time}
                        </Placeholder>
                      ) : (
                        h.time
                      )}
                    </div>
                  ))}
                </dd>
              </div>

              {/* Socials */}
              <div className="bg-ink-900 p-8 sm:col-span-2">
                <dt className="eyebrow">Follow</dt>
                <dd className="mt-4 flex gap-3">
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
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
