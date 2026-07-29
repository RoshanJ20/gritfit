import type { Metadata } from "next";
import { getProgram } from "@/content/programs";
import { ProgramDetail } from "@/components/sections/program-detail";

const program = getProgram("injury-return")!;

export const metadata: Metadata = {
  title: `${program.name} — Training`,
  description: program.lead,
};

export default function InjuryReturnPage() {
  return <ProgramDetail program={program} />;
}
