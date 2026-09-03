import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { announcementsByDate } from "@/lib/content";

/**
 * The single newest announcement, directly below the hero.
 *
 * Deliberately one item and deliberately static. A carousel here would rotate
 * two or three items past a reader who is still deciding whether to scroll,
 * and everything after the first slide goes unseen. The archive on
 * /insights#news is the place to browse; this band's only job is to show that
 * something happened recently, and to say what.
 */
export function LatestBand() {
  const [latest] = announcementsByDate;
  if (!latest) return null;

  return (
    <section id="latest" className="section-tight relative border-b border-border">
      <Container>
        <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <span className="eyebrow">Latest from ASME</span>
          <Link
            href="/resources#news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-deep"
          >
            All news and updates
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-6">
          <Link
            href={latest.href}
            className="group flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <div className="flex shrink-0 items-center gap-3 sm:w-56">
              <span className="chip">{latest.kind}</span>
              <time
                dateTime={latest.date}
                className="text-xs uppercase tracking-[0.14em] text-fg-subtle"
              >
                {formatDate(latest.date)}
              </time>
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl tracking-tight text-fg transition-colors group-hover:text-brand-blue md:text-3xl">
                {latest.title}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-muted pretty">
                {latest.blurb}
              </p>
            </div>
            <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-fg-subtle transition-colors group-hover:text-brand-blue sm:block" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

/** Parsed as UTC so the rendered date cannot shift by a day between the server
 *  and a browser in a different timezone. */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
