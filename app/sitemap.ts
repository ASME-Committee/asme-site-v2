import type { MetadataRoute } from "next";
import { articles } from "@/lib/blog";
import { announcementArticles, announcementSlug, innovatorInterviews, site } from "@/lib/content";

/**
 * sitemap.xml, built with the site. It lists every page meant to be found in
 * search, so Google does not have to discover them by following links.
 *
 * Pages marked robots: { index: false } are left out on purpose (/blog,
 * /community, /insights, /systems-change). Articles, interviews and announcement pages are
 * read from the same lists that build them, so a new one is included without
 * editing this file. Addresses end in a slash to match trailingSlash: true.
 */
export const dynamic = "force-static";

const pages = [
  "/",
  "/about/",
  "/changing-the-system/",
  "/programs/",
  "/events/",
  "/resources/",
  "/resources/articles/",
  "/partners/",
  "/membership/",
  "/join/",
  "/contact/",
  "/privacy/",
  "/terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...articles.map((a) => ({
      url: `${site.url}/resources/articles/${a.slug}/`,
      lastModified: a.date,
    })),
    ...innovatorInterviews.items.map((i) => ({
      url: `${site.url}/resources/interviews/${i.slug}/`,
    })),
    ...announcementArticles.map((a) => ({
      url: `${site.url}/resources/announcements/${announcementSlug(a)}/`,
      lastModified: a.date,
    })),
  ];
}
