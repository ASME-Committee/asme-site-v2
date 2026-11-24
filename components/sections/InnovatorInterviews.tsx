import Link from "next/link";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { innovatorInterviews, interviewFields } from "@/lib/content";

/**
 * The Innovator Interviews panel on /resources, under the graduation address.
 *
 * One card per published interview, each opening that interview's own page.
 * While the series is small, the row is topped up to three with "coming soon"
 * cards for the fields not yet covered, so one interview does not sit alone in
 * a box built for a collection. Once there are three or more interviews the
 * placeholders stop appearing on their own.
 *
 * Thumbnails come straight from YouTube (i.ytimg.com) rather than being copied
 * into the repo, so a new interview needs no image file. The placeholder
 * "portraits" are drawn, not photographed: there is no real face to leak.
 *
 * The mark in the right of the panel is the ASME petal, drawn as a mask over a
 * white wash rather than an <img>, so it tints with the panel instead of
 * carrying its own blue into a blue box.
 */
const MARK = {
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

export function InnovatorInterviews() {
  const mark = asset("/asme-mark.svg");
  const { items } = innovatorInterviews;

  const covered = new Set(items.map((i) => i.field));
  const upcoming = interviewFields
    .filter((f) => !covered.has(f))
    .slice(0, Math.max(0, 3 - items.length));

  return (
    <Reveal className="mt-12">
      <div
        id="interviews"
        className="relative overflow-hidden rounded-[var(--panel-radius)] px-6 py-10 md:px-12 md:py-14"
        style={{ backgroundColor: "rgb(var(--accent))" }}
      >
        {/* The faded petal, bleeding off the right edge. Decorative. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-12 h-64 w-64 bg-white/[0.13] md:-right-20 md:h-96 md:w-96"
          style={{ ...MARK, maskImage: `url(${mark})`, WebkitMaskImage: `url(${mark})` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-16 hidden h-40 w-40 bg-white/[0.07] md:block"
          style={{ ...MARK, maskImage: `url(${mark})`, WebkitMaskImage: `url(${mark})` }}
        />

        <div className="relative">
          <h3 className="h-display max-w-xl text-3xl leading-[1.08] text-white md:text-[2.6rem]">
            {innovatorInterviews.title}{" "}
            <strong className="font-semibold text-white">{innovatorInterviews.titleAccent}</strong>
          </h3>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 pretty">
            {innovatorInterviews.body}
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {items.map((item) => (
              <li key={item.slug} className="col-span-2 sm:col-span-1">
                <Link
                  href={`/resources/interviews/${item.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-white/20 transition-transform hover:-translate-y-0.5"
                >
                  <span className="relative block aspect-video overflow-hidden bg-[rgb(var(--ink))]">
                    <img
                      src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[rgb(var(--accent))] shadow-soft transition-transform group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </span>
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="chip self-start">{item.field}</span>
                    <span className="mt-3 font-display text-lg leading-snug tracking-tight text-fg transition-colors group-hover:text-[rgb(var(--accent))]">
                      {item.title}
                    </span>
                    <span className="mt-2 text-sm font-semibold text-fg">{item.name}</span>
                    <span className="text-sm leading-snug text-fg-muted">{item.role}</span>
                  </span>
                </Link>
              </li>
            ))}

            {/* Decorative: says nothing a reader needs, so hidden from screen
                readers rather than announced as "coming soon" cards. */}
            {upcoming.map((field, i) => (
              <li
                key={field}
                aria-hidden="true"
                className="relative flex min-h-44 flex-col items-center justify-center overflow-hidden rounded-2xl bg-[rgb(var(--ink))]/45 p-3 ring-1 ring-inset ring-white/15 sm:p-5"
              >
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(58% 42% at ${40 + i * 11}% ${28 + i * 5}%, rgba(255,255,255,0.22), transparent 70%), radial-gradient(80% 60% at ${62 - i * 13}% ${90 - i * 4}%, rgba(8,18,48,0.6), transparent 74%)`,
                  }}
                />
                <span className="relative font-display text-5xl font-semibold text-white/55 sm:text-6xl">?</span>
                <span className="relative mt-4 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs text-[rgb(var(--ink))]">
                  {field}
                </span>
                <span className="relative mt-2 text-xs text-white/75">Coming soon</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
