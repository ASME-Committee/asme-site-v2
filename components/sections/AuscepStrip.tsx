import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { auscep } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * Home-page version of AUSCEP: track record, not an offer.
 *
 * AUSCEP is complete, so on the home page it earns a strip rather than the full
 * block it gets on Programs. The numbers are the point; anyone who wants the
 * detail follows the link.
 */
export function AuscepStrip() {
  return (
    <section id="auscep" className="relative pb-16 pt-4 md:pb-20">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface-subtle p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={asset(auscep.logo)}
                  alt={`${auscep.title}: ${auscep.subtitle.replace(/\.$/, "")}`}
                  width={338}
                  height={103}
                  className="h-9 w-auto"
                />
                <span className="chip shrink-0">Program complete</span>
              </div>
              <Link
                href="/programs#auscep"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-deep"
              >
                See what AUSCEP delivered
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 md:grid-cols-4">
              {auscep.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
