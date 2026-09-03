import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { articles, getArticleBySlug, getRecentArticles, formatDate } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.cover, alt: article.coverAlt }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const otherRecent = getRecentArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <PageShell>
        <section className="panel-lg">
          <Container>
            <Link
              href="/resources/articles"
              className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              All resources
            </Link>

            <div className="mt-8 max-w-3xl">
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-[rgb(var(--accent-light))]/10 px-2.5 py-0.5 font-medium text-[rgb(var(--accent))]">
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-fg-subtle">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
                <span className="text-fg-subtle">{formatDate(article.date)}</span>
              </div>
              <h1 className="h-display mt-5 text-[2.15rem] sm:text-5xl md:text-[3.25rem]">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty md:text-xl">
                {article.dek}
              </p>
              <p className="mt-6 text-sm text-fg-subtle">By {article.author}</p>
            </div>

          </Container>
        </section>

        <section className="panel-flush">
          <div className="relative aspect-[16/9]">
            <Image
              src={article.cover}
              alt={article.coverAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section id="article">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:col-span-3">
                <TableOfContents
                  sections={article.sections.map((s) => ({
                    id: s.id,
                    heading: s.heading,
                  }))}
                />
              </aside>

              <article className="lg:col-span-9">
                <div className="prose-asme">
                  {article.sections.map((section) => (
                    <section key={section.id} className="mb-12 scroll-mt-28">
                      <h2
                        id={section.id}
                        className="h-display text-2xl md:text-3xl"
                      >
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-5">
                        {section.body.map((para, i) => (
                          <p
                            key={i}
                            className="text-base leading-relaxed text-fg-muted pretty md:text-[1.05rem]"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {article.sources && article.sources.length > 0 && (
                  <section className="mt-16 border-t border-border pt-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
                      Sources
                    </h2>
                    <ol className="mt-5 space-y-3 text-sm">
                      {article.sources.map((s, i) => (
                        <li key={s.url} className="flex gap-3 text-fg-muted">
                          <span className="font-mono text-xs tracking-wider text-fg-subtle pt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-fg transition-colors hover:text-[rgb(var(--accent))] underline-offset-2 hover:underline"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                <div className="mt-12 border-t border-border pt-8">
                  <p className="text-sm text-fg-subtle">
                    Written by <span className="text-fg">{article.author}</span> · Published {formatDate(article.date)}
                  </p>
                </div>
              </article>
            </div>
          </Container>
        </section>

        {otherRecent.length > 0 && (
          <section className="panel-tint">
            <Container>
              <div className="flex items-end justify-between gap-8">
                <h2 className="h-display text-3xl md:text-[2.75rem]">
                  More <strong>resources.</strong>
                </h2>
                <Link
                  href="/resources/articles"
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-[rgb(var(--accent))]"
                >
                  All articles
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {otherRecent.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/resources/articles/${post.slug}`}
                    className="card card-hover group flex h-full flex-col overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.coverAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-brand-gradient-subtle px-2.5 py-0.5 font-medium text-brand-blue">
                          {post.category}
                        </span>
                        <span className="text-fg-subtle">{post.readTime}</span>
                      </div>
                      <h3 className="mt-4 font-display text-lg leading-snug tracking-tight text-fg pretty">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">
                        {post.dek}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
    </PageShell>
  );
}
