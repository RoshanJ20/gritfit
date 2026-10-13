import { membershipTiers } from "@/content/membership";
import { Reveal } from "@/components/motion/reveal";
import { PlanCard } from "@/components/membership/plan-card";

/**
 * Renders the three membership tiers. Pricing is handled at the club, so the
 * cards show access and inclusions only — no on-page prices or commitment-length
 * toggle.
 */
export function MembershipPlans() {
  return (
    <div className="group relative grid md:grid-cols-3">
      {membershipTiers.map((tier, i) => (
        <Reveal key={tier.name} delay={i * 0.08} className="h-full">
          <PlanCard tier={tier} />
        </Reveal>
      ))}
    </div>
  );
}
