import Link from "next/link";

import { site } from "@/content/site";
import { membershipTiers } from "@/content/membership";
import { secondaryCta } from "@/content/nav";
import { HeroVideo } from "@/components/hero-video";
import { Reveal, Rise } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";

const pillars = [
  {
    index: "01",
    label: "RUSH",
    href: "/rush",
    tagline: "Move with Meaning",
    media: "/images/home/rush.jpg",
    blurb:
      "RUSH is our signature training system—a complete approach to strength, conditioning, movement, recovery, and skill.\nAcross 14 unique class formats and training experiences, every class is designed to play a role in your long-term progress.",
  },
  {
    index: "02",
    label: "Strength Club",
    href: "/strength-club",
    tagline: "Train with intent",
    media: "/images/home/strength.jpg",
    blurb:
      "A coached training floor — not an open gym.\nStructured programming through workout cards, with coaches on the floor to guide every session.\nEvery workout is also delivered through our member app, keeping your training, tracking, and progress connected wherever you are.",
  },
  {
    index: "03",
    label: "The Recovery Zone",
    href: "/recovery",
    tagline: "Recovery hits different",
    media: "/images/home/recovery.jpg",
    blurb:
      "A space to slow down, release, and restore.\nDesigned to bring the body back to balance.",
  },
];

// Single source of truth — the membership page renders the same tiers.
const tiers = membershipTiers;
const tiersFootnote = membershipTiers.find((t) => t.footnote)?.footnote;

export default function Home() {
  return (
    <>
      {/* ============== HERO — the video, with the wordmark anchored ============== */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <HeroVideo />

        {/* Wordmark rests on the bottom edge. On mobile a short philosophy line
            sits above it (and the wordmark is lifted clear of the browser UI) so
            the first screen isn't empty; on desktop the statement lives in its
            own section below and this stays a clean edge-resting wordmark. */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-5 pb-20 text-center sm:pb-8 lg:gap-0 lg:px-4 lg:pb-12">
          <Reveal playOnMount delay={0.5} className="lg:hidden">
            <p className="mx-auto max-w-sm text-balance text-sm leading-relaxed text-foreground/85">
              Nothing is given — everything is earned through hard work. Built on
              a passion for strength, movement, and mindset.
            </p>
          </Reveal>

          <h1
            aria-label="Grit Fit"
            className="wordmark flex items-end justify-center gap-[0.07em] text-foreground"
          >
            <Rise playOnMount duration={1.1}>
              Grit
            </Rise>
            <Rise playOnMount delay={0.12} duration={1.1}>
              Fit
            </Rise>
          </h1>
        </div>
      </section>

      {/* ============== STATEMENT ============== */}
      <section className="container-grit section">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow">Our Philosophy</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-balance text-xl font-light leading-[1.55] text-foreground sm:text-2xl lg:text-[1.75rem]">
              Grit club is home where nothing is given — everything is earned
              through hard work. Built on a passion for strength, movement, and
              mindset.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============== PILLARS (editorial rows) ============== */}
      <section className="border-t border-border">
        {pillars.map((p, i) => (
          <div key={p.label} className="border-b border-border">
            <div className="container-grit section grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              {/* Media */}
              <Reveal
                className={i % 2 === 1 ? "lg:order-2" : ""}
                y={40}
              >
                <ParallaxMedia amount={36} className="aspect-[4/3]">
                  <MediaPlaceholder
                    label={p.label}
                    kind="video"
                    ratio="auto"
                    src={p.media}
                    className="h-full rounded-none border-0"
                  />
                </ParallaxMedia>
              </Reveal>

              {/* Copy */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="display text-2xl text-brand">{p.index}</span>
                    <span className="eyebrow">{p.tagline}</span>
                  </div>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-4 text-display-2">{p.label}</h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-5 max-w-md whitespace-pre-line text-balance leading-relaxed text-muted-foreground">
                    {p.blurb}
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <Link
                    href={p.href}
                    className="group mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:text-brand"
                  >
                    Explore {p.label}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ============== USP ============== */}
      <section className="container-grit section">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Why Grit</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-5 text-display-1">
                One roof.
                <br />
                Every discipline.
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col justify-center gap-6">
            {site.usp.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-balance leading-relaxed text-muted-foreground">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== MEMBERSHIP TEASER ============== */}
      <section className="border-y border-border bg-ink-800/40">
        <div className="container-grit section">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <p className="eyebrow">Membership</p>
              <h2 className="display mt-4 text-display-2 max-w-[14ch]">
                Choose how you train.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/membership"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:text-brand"
              >
                View all plans
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <Link
                  href="/membership"
                  className="flex h-full flex-col gap-5 bg-ink-900 p-8 transition-colors hover:bg-ink-800"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow">{t.name}</span>
                      {t.highlight && (
                        <span className="inline-flex items-center bg-brand px-2 py-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-background">
                          Most Chosen
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-lg font-light text-foreground">
                      {t.tagline}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                    {t.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <span className="mt-0.5 shrink-0 text-brand" aria-hidden>
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>

          {tiersFootnote && (
            <p className="mt-6 text-xs text-muted-foreground/70">
              {tiersFootnote}
            </p>
          )}
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="container-grit section text-center">
        <Reveal>
          <p className="eyebrow justify-center">Your first step starts here</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 text-display-1 max-w-[16ch]">
            Show up. Trust the process. Do the work.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Every first-timer begins with a complimentary assessment. No
            pressure. No expectations. Just a clear starting line.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Not sure yet? Find everything you need to decide in the{" "}
            <Link
              href="/first-timers"
              className="whitespace-nowrap text-foreground underline decoration-brand/60 underline-offset-4 transition-colors hover:text-brand"
            >
              First Timers
            </Link>{" "}
            section on our website.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex justify-center">
          <Magnetic strength={0.45}>
            <Link href={secondaryCta.href} className="btn btn-solid px-9 py-4">
              {secondaryCta.label}
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </>
  );
}
