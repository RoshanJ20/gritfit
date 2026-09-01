import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The site's standing "go here next" link.
 *
 * This pattern had been hand-written at nine call sites as a label with
 * `hover:text-brand` plus a `group-hover:translate-x-1` arrow. It is now one
 * component with a real hover: the label rolls up to a brand-coloured
 * duplicate of itself, the arrow travels, and the rule beneath wipes out to
 * the right and back in from the left so the two ends never cross. All three
 * share one 0.55s curve, so they read as a single response rather than three
 * effects.
 *
 * The second, brand-coloured copy of the label is drawn by CSS from
 * `data-label` rather than being a second span, so the link degrades to a
 * single label if the stylesheet is ever missing instead of rendering the
 * words twice. The visible copy is hidden from assistive tech and the
 * accessible name comes from the `sr-only` copy. Styles live in the
 * interaction layer at the bottom of app/globals.css.
 */
export function ActionLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: string;
  /** Render a plain anchor (tel:, mailto:, WhatsApp) instead of a route link. */
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span className="action-link-roll" aria-hidden>
        <span data-label={children}>{children}</span>
      </span>
      <span className="sr-only">{children}</span>
      <span className="action-link-arrow" aria-hidden>
        &rarr;
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={cn("action-link", className)}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cn("action-link", className)}>
      {inner}
    </Link>
  );
}

/**
 * The same treatment for an "Explore →" that lives inside a card that is
 * itself a link. It cannot be an anchor — nesting one inside another is
 * invalid and breaks keyboard navigation — so this renders a span and takes
 * its hover from the surrounding card instead. The card must carry
 * `card-charge`, which is the hook the CSS keys off.
 *
 * The whole thing is decorative here: the card link already carries the
 * destination and its own accessible name, so a second announcement of the
 * same label would only add noise.
 */
export function ActionLabel({
  children,
  className,
}: {
  /** A plain string — CSS draws the rolling copy from it via `attr()`. */
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("action-label", className)} aria-hidden>
      <span className="action-link-roll">
        <span data-label={children}>{children}</span>
      </span>
      <span className="action-link-arrow">&rarr;</span>
    </span>
  );
}
