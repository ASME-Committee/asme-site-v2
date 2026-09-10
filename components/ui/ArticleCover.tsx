import type { ArticleCategory } from "@/lib/blog";
import { ArticleDiagram } from "@/components/ui/ArticleDiagram";

/**
 * Cover art for articles: the structure the piece is about, drawn.
 *
 * The stock photography this replaced was seven variations on an object resting
 * on a wooden desk. The first attempt at replacing it set the title large on a
 * pale field, which fixed the stock problem and was dull. A drawing carries
 * something the title cannot: what shape the argument is. A vesting cliff, a
 * fork in a career with a way back, a price set below what the work bears.
 *
 * Colour is the category, so the kind of piece reads before the words do. Full
 * class strings rather than interpolation, so Tailwind can see them.
 */
const tone: Record<ArticleCategory, { field: string; ink: string; label: string; rule: string }> = {
  Playbook: {
    field: "bg-[rgb(var(--accent))]/[0.06]",
    ink: "text-[rgb(var(--ink))]",
    label: "text-[rgb(var(--accent))]",
    rule: "bg-[rgb(var(--accent))]",
  },
  Interview: {
    field: "bg-[rgb(var(--give))]/[0.16]",
    ink: "text-[rgb(var(--ink))]",
    label: "text-[rgb(var(--give-deep))]",
    rule: "bg-[rgb(var(--give-deep))]",
  },
  "Field note": {
    field: "bg-[rgb(var(--accent-light))]/[0.12]",
    ink: "text-[rgb(var(--ink))]",
    label: "text-[rgb(var(--accent-deep))]",
    rule: "bg-[rgb(var(--accent-light))]",
  },
  Essay: {
    field: "bg-[rgb(var(--ink))]/[0.06]",
    ink: "text-[rgb(var(--ink))]",
    label: "text-fg",
    rule: "bg-[rgb(var(--ink))]",
  },
};

export function ArticleCover({
  category,
  slug,
  size = "card",
}: {
  category: ArticleCategory;
  slug: string;
  /** `card` in a grid, `hero` at the top of the article itself. */
  size?: "card" | "hero";
}) {
  const t = tone[category] ?? tone.Playbook;
  const hero = size === "hero";

  return (
    <div className={`relative h-full w-full overflow-hidden ${t.field}`}>
      <span className={`absolute inset-x-0 top-0 h-1 ${t.rule}`} aria-hidden />

      <p
        className={`absolute left-0 top-0 z-10 ${
          hero ? "px-8 pt-9 md:px-14 md:pt-12" : "px-5 pt-5"
        } text-xs font-semibold uppercase tracking-[0.18em] ${t.label}`}
      >
        {category}
      </p>

      {/* The drawing sits inset from the label, and is decorative: the article's
          title and standfirst sit beside it as real text, so nothing here is the
          only place a fact appears. */}
      <div
        className={`flex h-full w-full items-center justify-center ${t.ink} ${
          hero ? "px-10 pb-8 pt-20 md:px-24 md:pb-14 md:pt-24" : "px-6 pb-5 pt-12"
        }`}
      >
        <div className={hero ? "w-full max-w-[620px]" : "w-full"}>
          <ArticleDiagram slug={slug} />
        </div>
      </div>
    </div>
  );
}
