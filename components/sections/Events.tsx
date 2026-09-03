import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { events, site } from "@/lib/content";
import { MapPin, Calendar, ArrowUpRight, Linkedin } from "lucide-react";

function HostBadge({ host }: { host: (typeof events)[number]["host"] }) {
  return host === "ASME" ? (
    <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-medium text-brand-blue">
      ASME event
    </span>
  ) : (
    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-fg-subtle">
      Ecosystem
    </span>
  );
}

/** `showFollowPrompt` makes the "events land on LinkedIn first" argument, which
 *  belongs on the Events page itself rather than the home-page teaser. */
export function Events({ showFollowPrompt = false }: { showFollowPrompt?: boolean }) {
  const upcoming = events
    .filter((e) => e.upcoming)
    .sort((a, b) => a.start.localeCompare(b.start));
  const past = events
    .filter((e) => !e.upcoming)
    .sort((a, b) => b.start.localeCompare(a.start));

  return (
    <section id="events" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Events</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Curated, <strong>not crowded.</strong>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            We don&rsquo;t run a packed calendar. We point you to the events worth
            your time across the clinician-innovation ecosystem: the ones ASME
            hosts, and the ones we rate.
          </p>
        </Reveal>

        {upcoming.length > 0 ? (
          <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <article className="card card-hover h-full p-7 flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="chip">{e.type}</span>
                    <HostBadge host={e.host} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-tight text-fg balance">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">
                    {e.blurb}
                  </p>
                  <div className="mt-auto pt-6 flex items-center gap-4 text-xs text-fg-subtle">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {e.date}
                    </span>
                    {e.city && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {e.city}
                      </span>
                    )}
                  </div>
                  {e.href && (
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-brand-blue"
                    >
                      {e.host === "ASME" ? "Register" : "View event"}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="card flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-fg-muted pretty">
                Nothing on the calendar this minute. The ecosystem never really
                stops, though, and we post new events on LinkedIn first.
              </p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-brand-blue"
              >
                <Linkedin className="h-4 w-4" />
                Follow for event drops
              </a>
            </div>
          </Reveal>
        )}

        {showFollowPrompt && upcoming.length > 0 && (
          <Reveal className="mt-10">
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-brand-gradient-subtle px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-fg-muted pretty">
                New events go out on LinkedIn before they reach this calendar.
              </p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-brand-blue"
              >
                <Linkedin className="h-4 w-4" />
                Follow for event drops
              </a>
            </div>
          </Reveal>
        )}

        {past.length > 0 && (
          <Reveal className="mt-14 border-t border-border pt-10">
            <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
              Recently
            </p>
            <ul className="mt-5 divide-y divide-border">
              {past.map((e) => (
                <li
                  key={e.title}
                  className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <p className="font-medium text-fg">{e.title}</p>
                      <HostBadge host={e.host} />
                    </div>
                    <p className="mt-0.5 text-sm text-fg-muted pretty">{e.blurb}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-xs text-fg-subtle">
                    <span>{e.date}</span>
                    {e.city && (
                      <>
                        <span>&middot;</span>
                        <span>{e.city}</span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
