import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { membershipTiers } from "@/content/membership";
import { secondaryCta } from "@/content/nav";
import { HeroVideo } from "@/components/hero-video";
import { HeroWordmark } from "@/components/hero-wordmark";
import { IntroSequence } from "@/components/intro-sequence";
import { SentenceLines } from "@/components/sections/sentence-lines";
import { Reveal, Curtain } from "@/components/motion/reveal";
import { ActionLink } from "@/components/sections/action-link";
import { CardEdge } from "@/components/sections/card-edge";
import { MediaPlaceholder } from "@/components/media-placeholder";

const pillars = [
  {
    index: "01",
    label: "Strength Club",
    href: "/strength-club",
    tagline: "Train with intent",
    media: "/images/home/strength.jpg",
    blurb:
      "Not an open gym. A coached training floor built around you.\nEvery member follows structured programming, with workout cards personally crafted from your Performance Assessment. Coaches guide, correct and support you when needed.\nWe measure your progress, so you can see what’s improving, where you’re headed and feel the difference.",
  },
  {
    index: "02",
    label: "RUSH",
    href: "/rush",
    tagline: "Move with Meaning",
    media: "/images/home/rush.jpg",
    blurb:
      "RUSH is our signature training system—a complete approach to strength, conditioning, movement, recovery and skill.\nAcross 14 unique class formats and training experiences, every class is designed to play a role in your long-term progress.",
  },
  {
    index: "03",
    label: "Essential Recovery",
    href: "/recovery",
    tagline: "Recovery hits different",
    media: "/images/home/recovery.jpg",
    blurb:
      "A space to slow down, release and restore.\nDesigned to bring the body back to balance.",
  },
];

// Single source of truth — the membership page renders the same tiers.
const tiers = membershipTiers;

export default function Home() {
  return (
    <>
      <IntroSequence />

      {/* ============== HERO — the video, with the wordmark anchored ============== */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <HeroVideo />

        {/* Wordmark rests on the bottom edge, lifted clear of the mobile
            browser UI. The statement lives in its own section below, so the
            first screen stays a clean edge-resting wordmark at every size. */}
        <div className="relative z-10 flex flex-col items-center px-5 pb-20 text-center sm:pb-8 lg:px-4 lg:pb-12">
          <HeroWordmark />
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
              Grit Fit is home where nothing is given — everything is earned
              through hard work. Built on a passion for strength, movement and
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
              <Curtain
                className={cn("aspect-[4/3]", i % 2 === 1 && "lg:order-2")}
              >
                <MediaPlaceholder
                  label={p.label}
                  kind="video"
                  ratio="auto"
                  src={p.media}
                  className="h-full rounded-none border-0"
                />
              </Curtain>

              {/* Copy */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="display text-2xl text-brand">
                      {p.index}
                    </span>
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
                  <ActionLink href={p.href} className="mt-7">
                    {`Explore ${p.label}`}
                  </ActionLink>
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
              <p className="eyebrow">Why Grit Fit</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-5 text-display-1">
                Everything you need.
                <br />
                Nothing you don’t.
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
              <ActionLink href="/membership">View all plans</ActionLink>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="h-full">
                <Link
                  href="/membership"
                  className="card-charge group/plan flex h-full flex-col gap-4 bg-ink-900 p-8 transition-colors hover:bg-ink-800"
                >
                  <CardEdge />
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
                  {/* One line only — the full breakdown lives on /membership. */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground">
                    See what&rsquo;s included
                    <span
                      aria-hidden
                      className="text-brand transition-transform group-hover/plan:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="container-grit section text-center">
        <Reveal>
          <p className="eyebrow justify-center">Your first step starts here</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mx-auto mt-6 text-display-1 max-w-[24ch]">
            <SentenceLines text="Show up. Trust the process. Feel the difference." />
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Every first-timer begins with a complimentary Performance
            Assessment. No pressure. No expectations. Just a clear starting
            line.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link href={secondaryCta.href} className="btn btn-solid px-9 py-4">
            {secondaryCta.label}
          </Link>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-8 max-w-md text-muted-foreground">
            Not sure yet? Find everything you need to decide in the{" "}
            <Link
              href="/first-timers"
              className="whitespace-nowrap text-foreground underline decoration-brand/60 underline-offset-4 transition-colors hover:text-brand"
            >
              First Timers Guide
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
