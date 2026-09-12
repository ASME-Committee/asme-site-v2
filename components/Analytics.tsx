import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set at build time (wired in
 * .github/workflows/deploy.yml from the repo variable GA_MEASUREMENT_ID). So
 * local dev, previews, and any build without the ID send no data at all, and
 * turning analytics on or off is a repo-settings change, not a code change.
 *
 * next/script (afterInteractive) is used rather than @next/third-parties to
 * avoid adding a dependency; it injects the standard gtag.js snippet into the
 * static export, so it works on GitHub Pages with no server.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
