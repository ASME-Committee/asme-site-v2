import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getRecentArticles, formatDate } from "@/lib/blog";

export function Insights({
  eyebrow = "Playbooks",
  heading = (
    <>
      Playbooks for <strong>clinicians who build.</strong>
    </>
  ),
  compact = false,
}: {
  eyebrow?: string;
  /** A node rather than a string so the caller can mark which half of the
   *  headline carries weight, the way every other section does. */
  heading?: ReactNode;
  /** Home-page teaser: titles only, no cover art. Keeps the landing page short
   *  and keeps stock photography off it. */
  compact?: boolean;
}) {
  const posts = getRecentArticles(compact ? 3 : 4);

  return (
    <section id="insights" className="section relative">
      <Container>
        <Reveal className="flex items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              {heading}
            </h2>
            <p className="mt-4 text-base text-fg-muted pretty">
              New articles arrive most days. Interviews, essays, and practical guides on clinical entrepreneurship.
            </p>
          </div>
          <Link
            href="/resources/articles"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-[rgb(var(--accent))] transition-colors"
          >
            All articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {compact ? (
          <ul className="mt-10 border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/resources/articles/${post.slug}`}
                  className="group flex items-baseline justify-between gap-8 py-6"
                >
                  <span className="text-lg font-medium tracking-tight text-fg pretty transition-colors group-hover:text-[rgb(var(--accent))]">
                    {post.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-4 text-xs uppercase tracking-[0.12em] text-fg-subtle">
                    {post.readTime}
                    <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-[rgb(var(--accent))]" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/resources/articles/${post.slug}`}
                className="card card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-brand-gradient-subtle px-2.5 py-0.5 font-medium text-[rgb(var(--accent))]">
                      {post.category}
                    </span>
                    <span className="text-fg-subtle">{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base leading-snug tracking-tight text-fg pretty">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty line-clamp-3">
                    {post.dek}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between text-xs text-fg-subtle">
                    <span>{post.author}</span>
                    <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-[rgb(var(--accent))]" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        )}

        <Reveal className="mt-10 text-center md:hidden">
          <Link
            href="/resources/articles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg"
          >
            All articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

      </Container>
    </section>
  );
}
