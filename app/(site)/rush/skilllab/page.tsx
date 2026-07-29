import type { Metadata } from "next";

import { skillab } from "@/content/rush";
import { rushHeroImages } from "@/content/rush-media";
import { PageHero } from "@/components/sections/page-hero";
import { FormatList } from "@/components/sections/format-list";
import { ModelNav } from "@/components/sections/model-nav";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Skillab — RUSH",
  description: skillab.intro[0],
};

export default function SkillabPage() {
  return (
    <>
      <PageHero
        eyebrow="RUSH · Skillab"
        title="Skillab"
        lead={skillab.intro}
        mediaLabel="Skillab"
        mediaSrc={rushHeroImages.Skillab}
      />
      <FormatList formats={skillab.formats} mediaKind="video" />
      <ModelNav current="skilllab" />
      <CtaBand />
    </>
  );
}
