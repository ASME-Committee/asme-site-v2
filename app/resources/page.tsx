import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { Insights } from "@/components/sections/Insights";
import { formatDate } from "@/components/sections/LatestBand";
import { announcementsByDate } from "@/lib/content";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { videos, webinars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "The ASME content library: newsletters, Clinician+ webinars, clinician-innovator interviews, and videos. Everything ASME creates, in one place.",
};

export default function ResourcesPage() {
  const featured = videos[0];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources"
        title={<>Everything ASME creates, <strong>in one place.</strong></>}
        lead="Newsletters, Clinician+ webinars, clinician-innovator interviews and videos — one library that keeps working for you."
      />

      {/* Clinician+ webinars */}
      <section id="webinars">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Clinician+ webinars</p>
            {/* The heading runs at -0.035em tracking, which is right for letters
                and wrong for a "+". Jammed against the "n" it read as a denser,
                heavier word than "series." even though both are the same size
                and weight. The mark gets its air back here. */}
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              The{" "}
              <strong>
                Clinician<span className="mx-[0.04em] tracking-normal">+</span> series.
              </strong>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
              Speakers, dates, and full recordings from our webinar series on turning a clinical idea
              into a venture.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {webinars.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover group flex h-full flex-col p-7"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
                    {w.date}
                  </span>
                  <h3 className="mt-3 font-display text-xl tracking-tight text-fg">{w.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted pretty">{w.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]">
                    Watch
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured video */}
      {featured && (
        <section id="videos">
          <Container>
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Videos</p>
              <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">Worth <strong>pressing play.</strong></h2>
            </Reveal>
            <Reveal className="mt-12 grid max-w-4xl gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <VideoEmbed youtubeId={featured.youtubeId} start={featured.start} title={featured.title} />
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-tight text-fg balance">
                  {featured.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
                  {featured.blurb}
                </p>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* News & Updates: the announcements archive. Short, dated items that link
          to the page where each fact permanently lives. */}
      <section id="news">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">News & updates</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              What is <strong>new at ASME.</strong>
            </h2>
          </Reveal>

          <ul className="mt-12 divide-y divide-border border-y border-border">
            {announcementsByDate.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.04}>
                <li>
                  <Link
                    href={a.href}
                    className="group flex flex-col gap-3 py-6 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
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
                      <h3 className="font-display text-xl tracking-tight text-fg transition-colors group-hover:text-[rgb(var(--accent))]">
                        {a.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted pretty">
                        {a.blurb}
                      </p>
                    </div>
                    <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-fg-subtle transition-colors group-hover:text-[rgb(var(--accent))] sm:block" />
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Newsletters — sent to every member, so no signup form here */}
      <section id="newsletters">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Newsletters</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">Straight to <strong>your inbox.</strong></h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
              Field notes, opportunities, and founder stories, sent to every ASME member. A browsable
              archive of past issues is coming soon.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Recent articles */}
      <Insights />

      <JoinCTA />
    </PageShell>
  );
}
