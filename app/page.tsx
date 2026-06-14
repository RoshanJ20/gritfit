import Link from "next/link";

import { site } from "@/content/site";
import { secondaryCta } from "@/content/nav";
import { HeroVideo } from "@/components/hero-video";
import { Reveal, Rise } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Placeholder } from "@/components/placeholder";

const pillars = [
  {
    index: "01",
    label: "RUSH",
    href: "/rush",
    tagline: "Move with Meaning",
    blurb:
      "Our signature class system. One day you chase pace and fight fatigue, the next you’re under the bar. Every class has a purpose.",
  },
  {
    index: "02",
    label: "Strength Club",
    href: "/strength-club",
    tagline: "Train with intent",
    blurb:
      "A coached training floor — not an open gym. Structured programming through workout cards, with coaches on the floor to guide every session.",
  },
  {
    index: "03",
    label: "The Recovery Zone",
    href: "/recovery",
    tagline: "Recovery hits different",
    blurb:
      "Contrast therapy — infrared heat, cold plunge, intentional rest. Two extremes, one purpose: come back composed, and come back stronger.",
  },
];

const disciplines = [
  "Strength",
  "Conditioning",
  "Calisthenics",
  "Boxing",
  "MMA",
  "Yoga",
  "Endurance",
  "Recovery",
];

const tiers = [
  { name: "Open Gym", note: "Choice of Classes or Strength Club" },
  { name: "Platinum", note: "Unlimited Classes & Strength Club" },
  { name: "VIP", note: "Everything, plus sauna & cold plunge" },
];

export default function Home() {
  return (
    <>
      {/* ============== HERO — the video, with the wordmark anchored ============== */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <HeroVideo />

        {/* Wordmark, fully visible, resting on the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-6 sm:pb-8 lg:pb-12">
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
      <section className="container-grit py-28 lg:py-44">
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
            <div className="container-grit grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
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
                  <p className="mt-5 max-w-md text-balance leading-relaxed text-muted-foreground">
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
      <section className="container-grit py-28 lg:py-44">
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

        {/* Disciplines */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-10">
            {disciplines.map((d) => (
              <span
                key={d}
                className="display text-2xl text-foreground/60 sm:text-3xl"
              >
                {d}
                <span className="ml-6 text-brand">/</span>
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============== MEMBERSHIP TEASER ============== */}
      <section className="border-y border-border bg-ink-800/40">
        <div className="container-grit py-24 lg:py-32">
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
                  className="flex h-full flex-col gap-4 bg-ink-900 p-8 transition-colors hover:bg-ink-800"
                >
                  <span className="eyebrow">{t.name}</span>
                  <span className="text-2xl">
                    <Placeholder label="Price">From —</Placeholder>
                  </span>
                  <span className="mt-auto text-sm text-muted-foreground">
                    {t.note}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="container-grit py-28 text-center lg:py-44">
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
