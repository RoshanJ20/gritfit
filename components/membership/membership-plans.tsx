"use client";

import { useState } from "react";
import { motion } from "motion/react";

import {
  membershipTiers,
  membershipDurations,
  defaultDuration,
  type BillingDuration,
} from "@/content/membership";
import { Reveal } from "@/components/motion/reveal";
import { PlanCard } from "@/components/membership/plan-card";

/**
 * Client wrapper that owns the commitment-length toggle (3 / 6 / 12 months) and
 * feeds the selected duration to every plan card so each shows its matching
 * price. Prices themselves live in `content/membership.ts` (placeholders until
 * confirmed).
 */
export function MembershipPlans() {
  const [duration, setDuration] = useState<BillingDuration>(defaultDuration);

  return (
    <>
      {/* Commitment-length toggle */}
      <Reveal className="mb-10 flex justify-center">
        <div
          role="tablist"
          aria-label="Membership commitment length"
          className="inline-flex items-center gap-1 rounded-full border border-border bg-ink-900 p-1"
        >
          {membershipDurations.map((d) => {
            const active = d.months === duration;
            return (
              <button
                key={d.months}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDuration(d.months)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 sm:px-5"
              >
                {active && (
                  <motion.span
                    layoutId="billing-toggle-pill"
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span
                  className={
                    active
                      ? "relative z-10 text-background"
                      : "relative z-10 text-muted-foreground hover:text-foreground"
                  }
                >
                  {d.label}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Plans */}
      <div className="group relative grid md:grid-cols-3">
        {membershipTiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.08} className="h-full">
            <PlanCard tier={tier} duration={duration} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
