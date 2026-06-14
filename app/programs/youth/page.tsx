import type { Metadata } from "next";
import { getProgram } from "@/content/programs";
import { ProgramDetail } from "@/components/sections/program-detail";

const program = getProgram("youth")!;

export const metadata: Metadata = {
  title: `${program.name} — Training`,
  description: program.lead,
};

export default function YouthPage() {
  return <ProgramDetail program={program} />;
}
