import type { Metadata } from "next";

import { flow } from "@/content/rush";
import { rushHeroImages } from "@/content/rush-media";
import { PageHero } from "@/components/sections/page-hero";
import { FormatList } from "@/components/sections/format-list";
import { ModelNav } from "@/components/sections/model-nav";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Flow — RUSH",
  description: flow.intro[0],
};

export default function FlowPage() {
  return (
    <>
      <PageHero
        eyebrow="RUSH · Flow"
        title="Flow"
        lead={flow.intro}
        mediaLabel="Flow"
        mediaSrc={rushHeroImages.Flow}
      />
      <FormatList formats={flow.formats} mediaKind="video" />
      <ModelNav current="flow" />
      <CtaBand
        eyebrow="Reset · Rebuild · Reconnect"
        heading="Balance your training. Restore your body."
      />
    </>
  );
}
