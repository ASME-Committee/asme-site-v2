import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/date";
import { announcementsByDate } from "@/lib/content";

/**
 * Announcements: things that have happened.
 *
 * The counterpart to On Now, which carries things you can still turn up to.
 * Keeping them apart is the point. On Now answers "can I come to something",
 * this answers "is this society going anywhere", and a reader arrives with one
 * question or the other, not both at once. Mixing them was what put a dated
 * partnership notice under a heading promising where to find us next.
 *
 * Three items, static, newest first. Deliberately not a ticker: moving text
 * cannot be read at a glance on a phone, needs a pause control to meet WCAG
 * 2.2.2, and hides everything after the first slide from search engines. The
 * full archive lives on /resources#news.
 */
const SHOWN = 3;

export function Announcements() {
  const [lead, ...rest] = announcementsByDate.slice(0, SHOWN);
  if (!lead) return null;

  return (
    <section id="announcements">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Announcements</p>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            What is <strong>new at ASME.</strong>
          </h2>
        </Reveal>

        {/* One big, two small. Three rows of equal weight cannot announce
            anything: the format reads as a list, which is right for the archive
            on /resources#news and wrong here. The newest item gets headline
            treatment so the block has something to say, and the two behind it
            stay compact so they support rather than compete. */}
        {/* The lead sits in a card, the rest are plain rows. Size alone was not
            enough separation: at three similar rows the block still read as a
            list. A filled card says "this one is the news" before a word is
            read. It runs a photo when the announcement has one, which is the
            strongest signal available, and falls back to type when it does not. */}
        <Reveal className="mt-10">
          <Link
            href={lead.href}
            className="card card-hover group block overflow-hidden"
          >
            <div className={lead.image ? "grid gap-0 md:grid-cols-2" : ""}>
              {lead.image && (
                <div className="relative aspect-[16/10] md:aspect-auto md:h-full md:min-h-[260px]">
                  <Image
                    src={asset(lead.image.src)}
                    alt={lead.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="chip">{lead.kind}</span>
                  <time
                    dateTime={lead.date}
                    className="text-xs uppercase tracking-[0.14em] text-fg-subtle"
                  >
                    {formatDate(lead.date)}
                  </time>
                </div>
                <h3 className="h-display mt-4 max-w-3xl text-2xl tracking-tight text-fg transition-colors group-hover:text-[rgb(var(--accent))] md:text-[2rem]">
                  {lead.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted pretty">
                  {lead.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        {rest.length > 0 && (
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {rest.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.04}>
                <li>
                  <Link
                    href={a.href}
                    className="group flex flex-col gap-3 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <div className="flex shrink-0 items-center gap-3 sm:w-56">
                      <span className="chip">{a.kind}</span>
                      <time
                        dateTime={a.date}
                        className="text-xs uppercase tracking-[0.14em] text-fg-subtle"
                      >
                        {formatDate(a.date)}
                      </time>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg tracking-tight text-fg transition-colors group-hover:text-[rgb(var(--accent))]">
                        {a.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted pretty">
                        {a.blurb}
                      </p>
                    </div>
                    <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-fg-subtle transition-colors group-hover:text-[rgb(var(--accent))] sm:block" />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        )}

        {/* Always shown, even when the three rows above are the whole archive:
            it is the only signpost on the home page to the news section. */}
        <div className="mt-7">
          <Link
            href="/resources#news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
          >
            All news and updates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
