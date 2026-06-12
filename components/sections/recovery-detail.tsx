import { PageHero } from "@/components/sections/page-hero";
import { Callout } from "@/components/sections/callout";
import { SiblingNav, type SiblingItem } from "@/components/sections/sibling-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

type DetailData = {
  name: string;
  intro: string;
  tagline: string;
  paras: string[];
  protocolLabel: string;
  protocol: string;
};

/**
 * Shared layout for the protocol-driven recovery modalities (Infrared Sauna,
 * Cold Plunge): hero, statement copy, a "Recommended use" callout, sibling nav.
 */
export function RecoveryDetail({
  data,
  siblings,
}: {
  data: DetailData;
  siblings: SiblingItem[];
}) {
  return (
    <>
      <PageHero
        eyebrow={`Essential Recovery · ${data.name}`}
        title={data.name}
        lead={[data.intro]}
        mediaLabel={data.name}
      />

      <section className="container-grit py-24 lg:py-36">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div className="space-y-6">
            <Reveal>
              <p className="eyebrow">{data.tagline}</p>
            </Reveal>
            {data.paras.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-balance text-xl font-light leading-[1.6] text-foreground">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          <Callout label={data.protocolLabel}>{data.protocol}</Callout>
        </div>
      </section>

      <SiblingNav eyebrow="More recovery" items={siblings} />
      <CtaBand
        eyebrow="The Recovery Zone"
        heading="Recovery is training."
        body="Arrive 10 minutes early, bring swimwear, a towel, and water. Our team will guide you through the process and recommended exposure times."
      />
    </>
  );
}
