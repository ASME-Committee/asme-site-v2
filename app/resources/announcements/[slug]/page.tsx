import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { asset } from "@/lib/asset";
import { formatDate } from "@/lib/date";
import {
  announcementAnchor,
  announcementArticles,
  announcementSlug,
  site,
} from "@/lib/content";

/**
 * A short article for one announcement, for the items that have one.
 *
 * Deliberately separate from /resources/articles. Those pages are the
 * playbooks and essays, and every list of them reads lib/blog.ts; an
 * announcement article lives on the announcement in lib/content.ts, so it can
 * only be reached from the Announcements list and the news bar.
 *
 * One white panel: heading, then the photo centred, then the text across the
 * panel's full width. The photo keeps its own shape rather than being cropped
 * to a banner: a handshake photo is portrait, and a wide crop would cut off
 * the faces that are the point of it.
 */

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return announcementArticles.map((a) => ({ slug: announcementSlug(a) }));
}

function find(slug: string) {
  return announcementArticles.find((a) => announcementSlug(a) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = find((await params).slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.blurb,
    openGraph: {
      title: item.title,
      description: item.blurb,
      type: "article",
      publishedTime: item.date,
      images: item.image ? [{ url: item.image.src, alt: item.image.alt }] : undefined,
    },
  };
}

export default async function AnnouncementPage({ params }: Props) {
  const item = find((await params).slug);
  if (!item || !item.article) notFound();

  return (
    <PageShell>
      {/* One white panel: every direct <section> in PageShell becomes its own
          panel, so the heading, photo and text share a single section. */}
      <section className="panel-lg">
        <Container>
          <Link
            href={`/resources#${announcementAnchor(item)}`}
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            All announcements
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip">{item.kind}</span>
              <time
                dateTime={item.date}
                className="text-xs uppercase tracking-[0.14em] text-fg-subtle"
              >
                {formatDate(item.date)}
              </time>
            </div>
            <h1 className="h-display mt-5 text-[2.15rem] balance sm:text-5xl md:text-[3.25rem]">
              {item.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty md:text-xl">
              {item.blurb}
            </p>
          </div>

          {item.image && (
            <figure className="mx-auto mt-12 max-w-lg">
              <Image
                src={asset(item.image.src)}
                alt={item.image.alt}
                width={1500}
                height={2000}
                sizes="(max-width: 640px) 100vw, 512px"
                className="h-auto w-full rounded-2xl"
                priority
              />
              {item.image.caption && (
                <figcaption className="mt-3 text-center text-sm leading-relaxed text-fg-subtle pretty">
                  {item.image.caption}
                </figcaption>
              )}
            </figure>
          )}

          <article className="mt-12">
            <div className="space-y-5">
              {item.article.body.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-fg-muted pretty md:text-[1.05rem]"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
              <Link
                href="/partners"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
              >
                See all ASME partners
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
          </article>
        </Container>
      </section>
    </PageShell>
  );
}
