import { cn } from "@/lib/utils";

type MapSnippetProps = {
  /** Neighbourhood / area name — the card's headline (e.g. "HRBR Layout"). */
  area: string;
  /** City shown under the area (e.g. "Bengaluru"). */
  city?: string;
  /** Google Maps deep link opened on click. */
  mapsUrl: string;
  /** Small label above the area. */
  kicker?: string;
  /** Confirmed pin. When set, coordinates replace the city line. */
  coordinates?: { lat: number; lng: number };
  /** Footer (sm) vs page feature (md). Ignored when `variant` is "band". */
  size?: "sm" | "md";
  /** Stacked card (default) vs full-width band with the caption laid over the map. */
  variant?: "card" | "band";
  className?: string;
};

const fmtCoord = (v: number, pos: string, neg: string) =>
  `${Math.abs(v).toFixed(4)}° ${v >= 0 ? pos : neg}`;

/** Stylised street grid — layered gradients, no embed, no API key, no external calls. */
const gridStyle = {
  backgroundColor: "#101010",
  backgroundImage: [
    "linear-gradient(115deg, transparent calc(50% - 1px), rgba(174,217,35,0.5) 50%, transparent calc(50% + 1px))",
    "linear-gradient(200deg, transparent calc(32% - 1px), rgba(255,255,255,0.16) 32%, transparent calc(32% + 1px))",
    "linear-gradient(160deg, transparent calc(72% - 1px), rgba(255,255,255,0.10) 72%, transparent calc(72% + 1px))",
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 26px)",
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 26px)",
  ].join(","),
};

/**
 * On-brand location card that opens Google Maps. A stylised street grid sits
 * under a pulsing brand pin; the whole thing is a real link, so it works
 * without JS and deep-links into the Maps app on mobile. Muted at rest, it
 * warms out of grayscale and lifts on hover.
 *
 * `variant="band"` is the footer treatment: the caption is laid over the map's
 * bottom fade rather than stacked beneath it, so the map image stays as large
 * as the space allows. The stage fills its container (`h-full`), so in the
 * footer's grid it stretches to the height of the two text stacks beside it.
 */
export function MapSnippet({
  area,
  city,
  mapsUrl,
  kicker = "Grit Fit · The Club",
  coordinates,
  size = "md",
  variant = "card",
  className,
}: MapSnippetProps) {
  const band = variant === "band";
  const sm = size === "sm";

  const coords = coordinates
    ? `${fmtCoord(coordinates.lat, "N", "S")} / ${fmtCoord(coordinates.lng, "E", "W")}`
    : null;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${area}${city ? `, ${city}` : ""} in Google Maps`}
      className={cn(
        "group relative block overflow-hidden border border-border bg-ink-800 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] focus-visible:border-brand/50",
        className,
      )}
    >
      {/* Brand top-line — sweeps in on hover / focus */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      {/* Map stage */}
      <div
        className={cn(
          "relative overflow-hidden",
          // `h-full` lets the band stretch to its grid row; the min-height only
          // bites when stacked (mobile), where it keeps the pin clear of the caption.
          band ? "h-full min-h-[19rem]" : sm ? "h-28" : "h-44",
        )}
      >
        {/* Muted at rest, warms on hover. */}
        <div
          aria-hidden
          className="absolute inset-0 [filter:grayscale(0.65)_brightness(0.9)] transition-[filter] duration-700 ease-out group-hover:[filter:grayscale(0)_brightness(1)]"
          style={gridStyle}
        />
        {/* Vignette + bottom fade so the pin and label read. The band's fade is
            deeper and reaches higher — it carries the caption. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: band
              ? "radial-gradient(90% 130% at 50% 34%, transparent 38%, rgba(7,7,7,0.6) 100%), linear-gradient(to top, rgba(7,7,7,0.95) 0%, rgba(7,7,7,0.82) 26%, transparent 68%)"
              : "radial-gradient(120% 90% at 50% 42%, transparent 42%, rgba(7,7,7,0.55) 100%), linear-gradient(to top, rgba(7,7,7,0.92), transparent 58%)",
          }}
        />
        {/* Pin + radar rings */}
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -translate-y-1/2",
            band ? "top-[34%]" : "top-[44%]",
          )}
        >
          <span
            className={cn(
              "map-radar absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand",
              band ? "size-4" : "size-3",
            )}
          />
          <span
            className={cn(
              "map-radar map-radar--b absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand",
              band ? "size-4" : "size-3",
            )}
          />
          <span
            className={cn(
              "relative block rounded-full bg-brand [box-shadow:0_0_0_4px_rgba(174,217,35,0.18),0_0_20px_4px_rgba(174,217,35,0.5)]",
              band ? "size-3.5" : "size-3",
            )}
          />
        </span>

        {/* Band caption — sits on the fade, inside the stage */}
        {band ? (
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-brand">
              {kicker}
            </p>
            <p className="display mt-2 text-2xl leading-none text-foreground sm:text-3xl">
              {area}
            </p>
            {coords ? (
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {coords}
              </p>
            ) : city ? (
              <p className="mt-2 text-sm text-muted-foreground">{city}</p>
            ) : null}
            <span className="mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-4 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-foreground">
              Open in Google Maps
              <span
                aria-hidden
                className="text-brand transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </div>
        ) : null}
      </div>

      {/* Card body */}
      {band ? null : (
        <div className={cn("relative", sm ? "p-4" : "p-6")}>
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-brand">
            {kicker}
          </p>
          <p
            className={cn(
              "display mt-1.5 text-foreground",
              sm ? "text-lg" : "text-2xl",
            )}
          >
            {area}
          </p>
          {coords ? (
            <p className="mt-1.5 font-mono text-xs text-muted-foreground">
              {coords}
            </p>
          ) : city ? (
            <p className="mt-1.5 text-xs text-muted-foreground">{city}</p>
          ) : null}

          <span className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-foreground">
            Open in Google Maps
            <span
              aria-hidden
              className="text-brand transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      )}

      {/* Radar keyframes — scoped global, server-safe (as MediaPlaceholder does). */}
      <style>{`
        @keyframes mapradar { 0% { opacity: 0.7; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-50%) scale(5); } }
        .map-radar { animation: mapradar 2.8s cubic-bezier(0.16,1,0.3,1) infinite; }
        .map-radar--b { animation-delay: 1.4s; }
        @media (prefers-reduced-motion: reduce) { .map-radar { animation: none; } }
      `}</style>
    </a>
  );
}
