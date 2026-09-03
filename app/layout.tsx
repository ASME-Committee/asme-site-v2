import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * ASME's brand typeface, used by the logo wordmark.
 *
 * Loaded here rather than shipped as a file in the repo: Manrope is an open
 * font and next/font fetches and self-hosts it at build time, so the published
 * site serves it from its own origin with no request to Google and no binary
 * to keep in sync with whatever the brand folder holds.
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}. ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name}. ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.fullName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}. ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} [--font-display:var(--font-inter)]`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
