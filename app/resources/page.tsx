import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { Insights } from "@/components/sections/Insights";
import { formatDate } from "@/lib/date";
import { getArticlesByCategory } from "@/lib/blog";
import { announcementsByDate } from "@/lib/content";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { videos, webinars, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "The ASME content library: the Clinician+ series of stories, webinars and newsletter, plus playbooks, essays and an archive of ASME news and updates.",
};

export default function ResourcesPage() {
  const featured = videos[0];
  const stories = getArticlesByCategory("Interview");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources"
        title={<>Everything ASME creates, <strong>in one place.</strong></>}
        lead="Innovator stories, webinars, articles and the Clinician+ newsletter, plus a running archive of ASME news and updates."
      />

      {/* Four content types, four peer sections, one treatment each: eyebrow,
          headline, one line of what it is, then the items. They are all called
          Clinician+, which is exactly why the name does not organise this page:
          a label on everything sorts nothing. It is said once, in the lead. */}

      {/* Stories: the Interview articles, surfaced under the name ASME uses for
          them. One place to write an interview, two places it can appear. */}
      <section id="stories">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Innovator stories</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              Clinicians who <strong>built something.</strong>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
              Interviews and talks from clinician innovators about what they made, what it cost,
              and what they would do differently.
            </p>
          </Reveal>

          {/* The graduation address is a story told first-hand rather than a
              separate content type, so it leads this section instead of sitting
              in a "Videos" section of its own holding one item. */}
          {featured && (
            <Reveal className="mt-12 grid max-w-4xl gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <VideoEmbed
                  youtubeId={featured.youtubeId}
                  start={featured.start}
                  title={featured.title}
                />
              </div>
              <div>
                <StoryBy kind="Talk" name={featured.speaker} role={featured.speakerRole} />
                <h3 className="mt-3 font-display text-2xl tracking-tight text-fg balance">
                  {featured.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
                  {featured.blurb}
                </p>
              </div>
            </Reveal>
          )}

          {stories.length > 0 ? (
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {stories.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.05}>
                  <Link
                    href={`/resources/articles/${a.slug}`}
                    className="card card-hover group flex h-full flex-col p-7"
                  >
                    <StoryBy
                      kind={a.category}
                      name={a.innovator?.name}
                      role={a.innovator?.role}
                      date={a.date}
                    />
                    <h3 className="mt-3 font-display text-xl tracking-tight text-fg">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted pretty">
                      {a.dek}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]">
                      Read the story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-sm text-fg-muted">The first stories are on their way.</p>
          )}
        </Container>
      </section>

      {/* Webinars */}
      <section id="webinars">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Webinars</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              Every session, <strong>recorded in full.</strong>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
              Speakers, dates and full recordings from our series on turning a clinical idea into
              something more.
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

      {/* Newsletter. It goes to members, so the action is joining, not an
          archive link that does not exist yet. */}
      <section id="newsletter">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Newsletters</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              Straight to <strong>your inbox.</strong>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
              Field notes, opportunities and founder stories. Coming soon, and sent to every ASME
              member. Membership is free.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <Link
              href={site.joinPath}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
            >
              <Mail className="h-4 w-4" />
              Join ASME to receive it
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Articles. Interviews are excluded: they are Stories above, and a piece
          should appear once. */}
      <Insights
        eyebrow="Articles"
        heading={<>Playbooks, essays and <strong>field notes.</strong></>}
        exclude="Interview"
      />

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
      <JoinCTA />
    </PageShell>
  );
}

/** One line above every Innovator story: what kind of story it is, then who it
 *  is about. Kept in one place so a talk and an interview cannot drift into
 *  labelling their person differently, and so a story added later inherits the
 *  format without anyone having to remember it.
 *
 *  `name` is optional: a story without a named innovator falls back to the type
 *  and date alone rather than rendering an empty byline. */
function StoryBy({
  kind,
  name,
  role,
  date,
}: {
  kind: string;
  name?: string;
  role?: string;
  date?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="chip">{kind}</span>
        {date && (
          <time
            dateTime={date}
            className="text-xs uppercase tracking-[0.14em] text-fg-subtle"
          >
            {formatDate(date)}
          </time>
        )}
      </div>
      {name && (
        <p className="text-sm font-semibold text-fg">
          {name}
          {role && <span className="font-normal text-fg-muted"> · {role}</span>}
        </p>
      )}
    </div>
  );
}
