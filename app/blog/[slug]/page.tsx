import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Redirect } from "@/components/ui/Redirect";
import { articles } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const metadata: Metadata = {
  title: "Moved",
  robots: { index: false, follow: true },
};

/** Articles moved from /blog/<slug> to /resources/articles/<slug>. One stub per
 *  article, so no existing link to a piece of writing goes dead. */
export default async function MovedArticlePage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageShell>
      <Redirect to={`/resources/articles/${slug}`} label="in Resources" />
    </PageShell>
  );
}
