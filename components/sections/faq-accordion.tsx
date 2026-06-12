import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export type Faq = { q: string; a: string[] };

/**
 * Reusable FAQ accordion. Answers are arrays of verbatim source lines.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`q-${i}`} className="border-border">
          <AccordionTrigger className="py-6 text-left text-lg font-medium hover:no-underline data-[state=open]:text-brand sm:text-xl">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="max-w-2xl space-y-2 text-base text-muted-foreground">
              {f.a.map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
