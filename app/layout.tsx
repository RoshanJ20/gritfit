import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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

const SITE = "https://gritfit.club";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Grit Fit — The Luxe Club",
    template: "%s · Grit Fit",
  },
  description:
    "Grit Fit — The Luxe Club. Strength, RUSH classes, and Essential Recovery under one roof in HRBR. Nothing is given. Everything is earned.",
  openGraph: {
    title: "Grit Fit — The Luxe Club",
    description:
      "Strength, RUSH classes, and Essential Recovery under one roof. Nothing is given. Everything is earned.",
    type: "website",
    url: SITE,
    siteName: "Grit Fit",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Grit Fit — Nothing given. Everything earned.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grit Fit — The Luxe Club",
    description:
      "Strength, RUSH classes, and Essential Recovery under one roof.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="grain min-h-full">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Header />
          <PageTransition>
            <main id="main" className="flex min-h-screen flex-col">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
