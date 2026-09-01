import type { Metadata } from "next";

import "@/app/globals.css";

import { fontVariables } from "@/app/fonts";

/** Same Dark Reader opt-out the site layout carries — see the note there. */
export const metadata: Metadata = {
  other: { "darkreader-lock": "true" },
};

/**
 * Root layout for the launch takeover.
 *
 * This is a *second* root layout (see `route-groups.md` — "Defining multiple
 * root layouts"). It deliberately renders none of the site chrome: no Header,
 * no Footer, no smooth-scroll provider, no page transitions. Nothing here can
 * navigate a visitor to another page, which is the point — while the countdown
 * is live it is the only page on the site.
 *
 * Because this is a separate root layout, moving between it and a `(site)`
 * route is a full document load rather than a client transition. That is the
 * behaviour we want for a takeover.
 */
export default function LaunchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="grain min-h-full overflow-hidden bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
