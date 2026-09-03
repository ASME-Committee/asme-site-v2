import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getRecentArticles, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Playbooks, interviews, field notes, and essays on clinical entrepreneurship. Written for founders, advisors, investors, and operators with a clinical background.",
};

/**
 * The full article archive. It used to live at /blog with its own page chrome,
 * which made it the one part of the site that did not look like the rest;
 * /blog and /blog/<slug> now redirect here so nothing published earlier breaks.
 *
 * The lead article is a panel of its own, the rest are a grid inside one panel.
 * That is the only hierarchy the page needs: a reader scanning an archive wants
 * titles, not a second navigation.
 */
export default function ArticlesPage() {
  const all = getRecentArticles();
  const [featured, ...rest] = all;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources"
        title={<>Playbooks for <strong>clinicians who build.</strong></>}
        lead="Field notes, interviews, and essays on clinical entrepreneurship. Each one is short, specific, and written by someone who has actually shipped the thing."
        secondaryCta={{ label: "Back to the library", href: "/resources" }}
      />

      {featured && (
        <section id="featured">
          <Container>
            <Reveal>
              <Link
                href={`/resources/articles/${featured.slug}`}
                className="group grid gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={featured.cover}
                    alt={featured.coverAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-[rgb(var(--accent-light))]/10 px-2.5 py-0.5 font-medium text-[rgb(var(--accent))]">
                      {featured.category}
                    </span>
                    <span className="text-fg-subtle">{featured.readTime}</span>
                  </div>
                  <h2 className="h-display mt-5 text-2xl md:text-[2rem]">{featured.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
                    {featured.dek}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-sm text-fg-subtle">
                    <span>
                      {featured.author} &middot; {formatDate(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-fg transition-colors group-hover:text-[rgb(var(--accent))]">
                      Read
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      <section id="archive">
        <Container>
          <p className="eyebrow">The archive</p>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Everything <strong>we have published.</strong>
          </h2>

          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/resources/articles/${post.slug}`}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-[rgb(var(--accent-light))]/10 px-2.5 py-0.5 font-medium text-[rgb(var(--accent))]">
                        {post.category}
                      </span>
                      <span className="text-fg-subtle">{post.readTime}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg leading-snug tracking-tight text-fg pretty transition-colors group-hover:text-[rgb(var(--accent))]">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{post.dek}</p>
                    <div className="mt-auto flex items-center justify-between pt-5 text-xs text-fg-subtle">
                      <span>
                        {post.author} &middot; {formatDate(post.date)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-[rgb(var(--accent))]" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
