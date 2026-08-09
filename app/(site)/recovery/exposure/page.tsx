import type { Metadata } from "next";

import { exposure, recovery } from "@/content/recovery";
import { PageHero } from "@/components/sections/page-hero";
import { FormatList } from "@/components/sections/format-list";
import { SiblingNav } from "@/components/sections/sibling-nav";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Exposure Therapy — Essential Recovery",
  description:
    "Controlled exposure to heat and cold — sauna, cold plunge, and contrast therapy. Move between the extremes on purpose.",
};

/** Recovery imagery keyed by format name for the alternating rows. */
const exposureImages: Record<string, string> = {
  Sauna: "/images/recovery/sauna.jpg",
  "Cold Plunge": "/images/recovery/cold-plunge.jpg",
  "Contrast Therapy": "/images/recovery/contrast.jpg",
};

const siblings = recovery.experiences.filter(
  (e) => e.href !== "/recovery/exposure",
);

export default function ExposureTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow={exposure.eyebrow}
        title={exposure.name}
        lead={[exposure.lead]}
        mediaLabel="Exposure Therapy"
        // Distinct from the Sauna row below, which uses sauna.jpg.
        mediaSrc="/images/recovery/steam.jpg"
        mediaImagePosition="center 40%"
      />

      <FormatList
        formats={exposure.formats}
        mediaKind="image"
        images={exposureImages}
      />

      <SiblingNav eyebrow="More recovery" items={siblings} />
      <CtaBand
        eyebrow="Essential Recovery"
        heading="Recovery is training."
        body="Arrive 10 minutes early. Our team will guide you through the process and recommended exposure times."
      />
    </>
  );
}
