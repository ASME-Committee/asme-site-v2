import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { innovatorInterviews, site } from "@/lib/content";

/**
 * One Innovator Interview: the video, who it is with, and what it covers.
 * Reached from the Innovator Interviews cards on /resources. The video plays
 * from ASME's YouTube channel; nothing about it is stored in this repo.
 *
 * One white panel, like the announcement pages: heading, then the video across
 * the panel, then the way back.
 */

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return innovatorInterviews.items.map((i) => ({ slug: i.slug }));
}

function find(slug: string) {
  return innovatorInterviews.items.find((i) => i.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = find((await params).slug);
  if (!item) return {};
  const title = `${item.name}: ${item.title}`;
  return {
    title,
    description: item.summary,
    openGraph: {
      title,
      description: item.summary,
      type: "video.other",
      images: [{ url: `https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg` }],
    },
  };
}

export default async function InterviewPage({ params }: Props) {
  const item = find((await params).slug);
  if (!item) notFound();

  return (
    <PageShell>
      <section className="panel-lg">
        <Container>
          <Link
            href="/resources#interviews"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            All interviews
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip">Innovator Interview</span>
              <span className="chip">{item.field}</span>
            </div>
            <h1 className="h-display mt-5 text-[2.15rem] balance sm:text-5xl md:text-[3.25rem]">
              {item.title}
            </h1>
            <p className="mt-5 text-base font-semibold text-fg">
              {item.name}
              <span className="font-normal text-fg-muted"> · {item.role}</span>
            </p>
          </div>

          <div className="mt-10">
            <VideoEmbed youtubeId={item.youtubeId} title={`${item.name}: ${item.title}`} />
          </div>

          <p className="mt-10 text-lg leading-relaxed text-fg-muted pretty md:text-xl">
            {item.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
            <Link
              href="/resources#stories"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
            >
              More innovator stories
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={site.joinPath}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
            >
              Join ASME
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
