import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { hero } from "@/lib/content";

/**
 * The hero is one of two panels filled with the brand colour. Everything else
 * is white on grey, so this reads as the page's opening statement without
 * needing decoration to make the point.
 *
 * Deliberately not a full screen. The headline is set at a size that fits on
 * three lines rather than four, and the panel's padding is tighter than a
 * conventional hero, because the section that has to be reached is ThreeDoors
 * and every pixel spent here pushes recognition further down the page. The
 * animated gradient mesh that used to sit behind it is gone.
 */
export function Hero() {
  return (
    <section id="top" className="panel-accent">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          {hero.eyebrow}
        </p>

        <h1 className="h-display mt-5 text-white text-[2.15rem] sm:text-5xl md:text-[3.25rem]">
          {hero.headlineLead} <strong>{hero.headlineAccent}</strong>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg pretty">
          {hero.sub}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink
            href={hero.primaryCta.href}
            size="lg"
            className="bg-white text-[rgb(var(--accent-deep))] hover:bg-white/90"
          >
            {hero.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>

          {/* Subordinate on purpose. Students and registrars are the priority
              audience, so the senior clinician's ask is a link, not a button.
              The underline is green because this is the first appearance of the
              contribution thread; green text would be 4.1:1 on this blue, so the
              colour goes into the rule rather than the words. */}
          <Link
            href={hero.contributeCta.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-2 decoration-[rgb(var(--give))] underline-offset-4 transition-opacity hover:opacity-80"
          >
            {hero.contributeCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Free to join &middot; Open to all clinicians &middot; Two minutes to apply
        </p>
      </div>
    </section>
  );
}
