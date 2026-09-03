import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { contributeAsk, hero, site } from "@/lib/content";

/**
 * Closing call to action, and the second of the page's two full-colour panels.
 *
 * Dark blue, where the hero is brand blue. The two were the same colour and the
 * page read as repeating itself at the bottom rather than resolving.
 *
 * The two audiences are now separated rather than stacked. Everything above the
 * rule is aimed at the people the society wants joining: one button and three
 * reassurances, all of which reduce cost. Below it, marked with the same green
 * bar the third door carries, is the ask aimed at the people who have already
 * built something, where cost is not the objection and contribution is the
 * point. Previously both sat in one column and the second read as a footnote to
 * the first.
 */
export function JoinCTA({ showLinkedIn = true }: { showLinkedIn?: boolean }) {
  return (
    <section id="join" className="panel-ink">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
          Join the community
        </p>

        <h2 className="h-display mt-5 text-white text-[2rem] sm:text-4xl md:text-[3rem]">
          Find the clinicians who <strong>think like you.</strong>
        </h2>

        <div className="mt-8">
          <ButtonLink
            href={site.joinPath}
            size="lg"
            className="bg-white text-[rgb(var(--accent))] hover:bg-white/90"
          >
            Join ASME
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Free to join &middot; Two minutes to apply &middot; No clinical-society dues
        </p>

        {/* The contribution thread's third and largest appearance. */}
        <div className="contribute-mark mt-10 max-w-xl">
          <p className="text-sm leading-relaxed text-white/80 pretty">
            {contributeAsk}
          </p>
          <Link
            href={hero.contributeCta.href}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white underline decoration-2 decoration-[rgb(var(--give))] underline-offset-4 transition-opacity hover:opacity-80"
          >
            Offer your experience
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {showLinkedIn && (
          <p className="mt-10 text-sm text-white/70">
            Or just start by following us on{" "}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
