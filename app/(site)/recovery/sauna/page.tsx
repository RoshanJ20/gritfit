import type { Metadata } from "next";

import { sauna, recovery } from "@/content/recovery";
import { RecoveryDetail } from "@/components/sections/recovery-detail";

export const metadata: Metadata = {
  title: "Infrared Sauna — Essential Recovery",
  description:
    "Built for recovery. Designed to reset. Heat. Discipline. Adaptation. Recommended ~2–3 sessions per week, 10–15 minutes per session.",
};

const siblings = recovery.offerings
  .filter((o) => o.key !== "sauna")
  .map(({ name, href, tagline }) => ({ name, href, tagline }));

export default function SaunaPage() {
  return (
    <RecoveryDetail
      data={sauna}
      siblings={siblings}
      image="/images/recovery/sauna.jpg"
    />
  );
}
