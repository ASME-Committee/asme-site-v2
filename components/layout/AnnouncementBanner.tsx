"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { asset } from "@/lib/asset";
import { announcementAnchor, announcementsByDate } from "@/lib/content";

/**
 * The news bar above the nav: the newest announcement, or nothing.
 *
 * It reads announcementsByDate[0], the same list behind the Announcements
 * section at /resources#news, so posting a news item is the only thing needed
 * to change it. There is no second copy to keep in step.
 *
 * It links to that item's own entry in the Announcements list, not straight to
 * the story: the reader lands on the item, highlighted, among the rest of the
 * news, and the entry links on to the full story.
 *
 * Why this is a client component rather than server-rendered: the site is a
 * static export, so anything decided on the server is decided at build time.
 * "Is this item still recent" asked at build time freezes at whatever the
 * answer was on the last deploy, and a bar announcing week-old news would keep
 * saying so a month later if nobody merged anything. The age is therefore
 * checked in the browser, against the reader's own clock, on every visit.
 *
 * The cost is that the bar cannot be in the first paint: it mounts, then
 * appears. That is a small shift at the top of the page, and the alternative is
 * reserving space for a bar that usually should not be there at all.
 *
 * It stays pinned while the reader scrolls, and the nav pins directly under
 * it. The two cannot share one sticky wrapper (the bar lives in the root
 * layout, the nav inside each page), so the bar publishes its height as
 * --banner-h and the nav uses that as its own top offset. When the bar is
 * dismissed, hidden as stale, or absent, the variable goes back to 0 and the
 * nav returns to the top edge.
 */

/** Days an announcement stays on the bar. After this it hides itself, so a
 *  quiet month reads as no news rather than as stale news. */
const MAX_AGE_DAYS = 14;

const STORAGE_KEY = "asme:banner-dismissed";

export function AnnouncementBanner() {
  const latest = announcementsByDate[0];

  // Identity, not a boolean: dismissing this item must not silence the next
  // one. When a newer announcement lands the id changes and the bar returns,
  // including for readers who closed the last one.
  const id = latest ? `${latest.date}:${latest.href}` : "";

  const [show, setShow] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!latest) return;

    const ageMs = Date.now() - new Date(`${latest.date}T00:00:00`).getTime();
    if (ageMs > MAX_AGE_DAYS * 86_400_000) return;

    // A blocked or cleared store is not a reason to hide the news, so a throw
    // here falls through to showing the bar.
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === id) return;
    } catch {
      /* private window, blocked storage: show it */
    }

    setShow(true);
  }, [latest, id]);

  // Keep --banner-h equal to the bar's real height. It is measured rather than
  // hard-coded because it changes: one line on a laptop, and a long headline
  // or a larger text setting can make it taller.
  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!show || !el) {
      root.style.setProperty("--banner-h", "0px");
      return;
    }
    const set = () => root.style.setProperty("--banner-h", `${el.offsetHeight}px`);
    set();
    // Arriving from an email at /programs#sparc, the browser jumps to the
    // section before this bar exists, then the bar appears on top of the
    // section's heading. Jump again now the bar's height is known.
    if (window.location.hash) {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      target?.scrollIntoView({ block: "start" });
    }
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--banner-h", "0px");
    };
  }, [show]);

  if (!latest || !show) return null;

  return (
    <aside
      ref={barRef}
      aria-label="Latest ASME news"
      className="sticky top-0 z-[60] bg-[rgb(var(--give))] text-[rgb(var(--ink))]"
    >
      <Container className="flex min-h-11 items-center gap-x-3 gap-y-1 py-2 text-sm">
        <span className="hidden shrink-0 rounded bg-[rgb(var(--ink))] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white sm:inline-block">
          New
        </span>

        {/* A plain link, not next/link, on purpose. next/link changes page
            with pushState, and the browser does not update :target for that,
            so the entry's highlight never showed. A real navigation lets the
            browser jump to the entry and mark it, including when the reader is
            already on /resources. asset() adds the base path next/link would
            have added; the trailing slash matches trailingSlash: true. */}
        <a
          href={`${asset("/resources/")}#${announcementAnchor(latest)}`}
          className="group flex min-w-0 flex-1 items-center gap-x-3 max-sm:items-stretch"
        >
          <span className="min-w-0 truncate font-medium">{latest.title}</span>
          <span className="hidden shrink-0 whitespace-nowrap underline underline-offset-2 opacity-80 transition-opacity group-hover:opacity-100 sm:inline">
            Read more <span aria-hidden="true">&rarr;</span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => {
            setShow(false);
            try {
              window.localStorage.setItem(STORAGE_KEY, id);
            } catch {
              /* nothing to remember it with; it returns on the next visit */
            }
          }}
          aria-label="Dismiss this announcement"
          className="-mr-1 shrink-0 rounded p-1 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </Container>
    </aside>
  );
}
