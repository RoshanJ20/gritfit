import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { CollapsibleSection } from "@/content/first-timers";

/**
 * Single-open accordion for rich, multi-block sections (paragraphs + labelled
 * bullet lists). `type="single" collapsible` means opening one section collapses
 * whichever was open. Each item is numbered for structure.
 */
export function SectionAccordion({
  sections,
}: {
  sections: CollapsibleSection[];
}) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {sections.map((s, i) => (
        <AccordionItem key={s.title} value={`s-${i}`} className="border-border">
          <AccordionTrigger className="gap-6 py-7 text-left hover:no-underline data-[state=open]:text-brand">
            <span className="flex items-baseline gap-5">
              <span className="display text-sm tabular-nums text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-xl sm:text-2xl">{s.title}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-10">
            <div className="max-w-2xl space-y-7 sm:pl-11">
              {s.blocks.map((b, j) => (
                <div key={j} className="space-y-3">
                  {b.label && <p className="eyebrow">{b.label}</p>}
                  {b.text?.map((line, k) => (
                    <p key={k} className="leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                  {b.items && (
                    <ul className="flex flex-col">
                      {b.items.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-4 border-b border-border py-3 text-foreground last:border-b-0"
                        >
                          <span
                            className="mt-2 size-1.5 shrink-0 bg-brand"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
