/**
 * The decorative half of the card hover — a brand rule that grows across the
 * top edge and viewfinder ticks that draw in at opposite corners.
 *
 * Drop it as a child of any surface carrying `card-charge`; the surface owns
 * the hover/focus state and the transitions (see the interaction layer at the
 * bottom of app/globals.css). Purely presentational, so every element here is
 * hidden from assistive tech.
 *
 * The other two halves of the effect are opt-in on the same surface: add
 * `data-charge-media` to an image so it lifts and lights, and `card-index` to
 * an index numeral so it goes brand-coloured.
 */
export function CardEdge() {
  return (
    <>
      <span aria-hidden className="card-edge-rule" />
      <span aria-hidden className="card-edge-tick card-edge-tl" />
      <span aria-hidden className="card-edge-tick card-edge-br" />
    </>
  );
}
