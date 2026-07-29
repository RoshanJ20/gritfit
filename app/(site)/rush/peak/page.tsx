import type { Metadata } from "next";

import { peak } from "@/content/rush";
import { rushHeroImages } from "@/content/rush-media";
import { PageHero } from "@/components/sections/page-hero";
import { FormatList } from "@/components/sections/format-list";
import { ModelNav } from "@/components/sections/model-nav";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Peak — RUSH",
  description: peak.tagline,
};

export default function PeakPage() {
  return (
    <>
      <PageHero
        eyebrow="RUSH · Peak"
        title="Peak"
        lead={[peak.tagline]}
        mediaLabel="Peak"
        mediaSrc={rushHeroImages.Peak}
      />
      <FormatList formats={peak.formats} mediaKind="video" />
      <ModelNav current="peak" />
      <CtaBand />
    </>
  );
}
