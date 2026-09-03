import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { auscep, societyMetrics, trackRecord } from "@/lib/content";

/**
 * AUSCEP's results on the home page, framed as track record rather than as a
 * closed program.
 *
 * The order matters and it used to be wrong. The figures came first and the
 * explanation came last, as a caption under a logo, so a first-time reader met
 * "152K patient lives impacted" attached to an acronym they had never seen,
 * then a wordmark, then "delivered with MTPConnect", and had to assemble the
 * meaning backwards. The explanation now runs before the numbers and spells
 * the acronym out, so the figures land already knowing what produced them.
 *
 * The AUSCEP wordmark is gone with it. The sentence says the name in full,
 * which a 32px-high logo did not.
 *
 * Two labelled groups, not six loose numbers: the cohorts' output answers the
 * heading, and the society's scale sits underneath as context. Keeping them
 * apart keeps the heading honest, since 15 partners is not something a
 * clinician built.
 *
 * Figures render statically. AnimatedNumber's count-up is driven by
 * requestAnimationFrame, which stalls in a backgrounded or throttled tab and
 * leaves the number frozen partway with no recovery.
 */
export function TrackRecord() {
  return (
    <section id="auscep">
      <Container>
        <p className="eyebrow">{trackRecord.eyebrow}</p>
        <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
          What clinicians here have <strong>already built.</strong>
        </h2>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-fg-muted pretty">
          {trackRecord.lede}
        </p>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.14em] text-fg-subtle">
            {trackRecord.outcomesLabel}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
            {auscep.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.14em] text-fg-subtle">
            {trackRecord.scaleLabel}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
            {societyMetrics.map((m) => (
              <div key={m.label}>
                <dt className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                  {m.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Link
          href={trackRecord.cta.href}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))] transition-colors hover:text-[rgb(var(--accent-deep))]"
        >
          {trackRecord.cta.label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Container>
    </section>
  );
}
