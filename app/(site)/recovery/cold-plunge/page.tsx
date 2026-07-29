import type { Metadata } from "next";

import { coldPlunge, recovery } from "@/content/recovery";
import { RecoveryDetail } from "@/components/sections/recovery-detail";

export const metadata: Metadata = {
  title: "Cold Plunge — Essential Recovery",
  description:
    "Cool down with purpose. Deliberate Cold Exposure as a controlled stressor the body adapts to over time. Recommended 2–3 sessions per week, 2–3 minutes per session.",
};

const siblings = recovery.offerings
  .filter((o) => o.key !== "cold-plunge")
  .map(({ name, href, tagline }) => ({ name, href, tagline }));

export default function ColdPlungePage() {
  return (
    <RecoveryDetail
      data={coldPlunge}
      siblings={siblings}
      image="/images/recovery/cold-plunge.jpg"
    />
  );
}
