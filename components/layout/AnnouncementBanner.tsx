"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { announcementsByDate } from "@/lib/content";

/**
 * The news bar above the nav: the newest announcement, or nothing.
 *
 * It reads announcementsByDate[0], the same list behind the home page band and
 * the /resources#news archive, so posting a news item is the only thing needed
 * to change it. There is no second copy to keep in step.
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

  if (!latest || !show) return null;

  return (
    <aside
      aria-label="Latest ASME news"
      className="bg-[rgb(var(--give))] text-[rgb(var(--ink))]"
    >
      <Container className="flex min-h-11 items-center gap-x-3 gap-y-1 py-2 text-sm">
        <span className="hidden shrink-0 rounded bg-[rgb(var(--ink))] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white sm:inline-block">
          New
        </span>

        <Link
          href={latest.href}
          className="group flex min-w-0 flex-1 items-center gap-x-3 max-sm:items-stretch"
        >
          <span className="min-w-0 truncate font-medium">{latest.title}</span>
          <span className="hidden shrink-0 whitespace-nowrap underline underline-offset-2 opacity-80 transition-opacity group-hover:opacity-100 sm:inline">
            Read more <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

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
