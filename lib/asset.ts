/**
 * Resolve a public/ asset path against the deployment base path.
 *
 * Next does NOT prepend `basePath` to string `src` values that point at the
 * public/ folder (only to imported/bundled assets). On GitHub Pages project
 * sites the app lives under /asme-site, so a bare "/partners/x.png" would 404.
 * Wrap such paths in asset() so they resolve correctly at any base path.
 * Absolute http(s) URLs (e.g. remote Unsplash covers) are returned unchanged.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path}`;
}
