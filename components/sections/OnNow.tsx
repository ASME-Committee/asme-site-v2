import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { events, onNow } from "@/lib/content";

/**
 * The home page's live block: what is actually happening, in one place.
 *
 * Only things a reader can turn up to. Clinician+ used to be pinned above the
 * events, but a program that starts in November with no way to apply yet fails
 * the block's own test: this asks "what can I attend", and the answer for it was
 * nothing. It is an announcement until applications open, at which point it
 * belongs back here with a link to apply.
 *
 * Events filter by date rather than by the `upcoming` flag alone, so one that
 * passes drops off the home page without anyone editing content.
 *
 * Items are rows divided by rules. The panel is the frame; boxing each item
 * inside it would put a border around content that is already bordered.
 */
export function OnNow() {
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = events
    .filter((e) => e.upcoming && e.start >= today)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 3);

  return (
    <section id="on-now">
      <Container>
        <p className="eyebrow">{onNow.eyebrow}</p>
        <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
          Where to <strong>find us next.</strong>
        </h2>

        <ul className="mt-10 border-t border-border">
          {upcoming.map((e) => (
            <li key={e.title} className="border-b border-border py-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-fg">
                  {e.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.12em] text-fg-subtle">
                  {e.date}
                  {e.city ? ` · ${e.city}` : ""}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fg-muted pretty">
                {e.blurb}
              </p>
              {e.href && (
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
                >
                  {e.host === "ASME" ? "Register" : "View event"}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-fg-muted pretty">{onNow.footer}</p>
          <Link
            href={onNow.cta.href}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
          >
            {onNow.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
