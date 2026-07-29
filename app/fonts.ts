import { Anton, Archivo, Geist, Geist_Mono } from "next/font/google";

/**
 * Typeface setup shared by both root layouts — `(site)` and `(launch)`.
 *
 * The app has two root layouts (see `app/(launch)/layout.tsx`), and each must
 * declare the `<html>` element itself. Keeping the font instances here means
 * the countdown takeover renders in exactly the same type as the rest of the
 * club, without either layout drifting from the other.
 */

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Heavy condensed display — used only for the oversized hero wordmark.
const anton = Anton({
  variable: "--font-wordmark",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/** Every font variable, ready to drop on `<html>`. */
export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${anton.variable}`;
