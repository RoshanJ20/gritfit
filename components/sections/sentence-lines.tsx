/**
 * Renders a short statement heading with one sentence per line.
 *
 * The club's closing lines are written as clipped, three-beat statements
 * ("Show up. Trust the process. Feel the difference."). Set as running text
 * they wrap wherever the column happens to end and the rhythm is lost, so each
 * sentence gets its own line instead. Single-sentence headings pass straight
 * through unchanged.
 */
export function SentenceLines({ text }: { text: string }) {
  const lines =
    text
      .match(/[^.!?]+[.!?]*/g)
      ?.map((s) => s.trim())
      .filter(Boolean) ?? [];

  if (lines.length < 2) return <>{text}</>;

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </>
  );
}
