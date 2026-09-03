import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { auscep, photos } from "@/lib/content";
import { asset } from "@/lib/asset";

export function Auscep() {
  return (
    <section id="auscep" className="section relative">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{auscep.eyebrow}</span>
              {auscep.closed && <span className="chip">Program complete</span>}
            </div>
            <h2 className="mt-5">
              <Image
                src={asset(auscep.logo)}
                alt={`${auscep.title}: ${auscep.subtitle.replace(/\.$/, "")}`}
                width={338}
                height={103}
                className="h-auto w-full max-w-[300px]"
                priority={false}
              />
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted pretty">
              {auscep.description}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
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

            <p className="mt-6 text-xs leading-relaxed text-fg-subtle">{auscep.report.note}</p>

            <div className="mt-4 flex flex-col items-start gap-4">
              <ButtonLink
                href={auscep.report.href}
                size="md"
                target="_blank"
                rel="noopener noreferrer"
              >
                {auscep.report.label}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <Link
                href="/membership#directory"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-deep"
              >
                See the ventures AUSCEP alumni built
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="lg:col-span-7 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {auscep.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06}>
                <article className="h-full">
                  <div className="font-mono text-xs tracking-wider text-fg-subtle">
                    PILLAR / {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-tight text-fg">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">
                    {pillar.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          {/* Four cohorts and 157 clinicians is a number until you see a room
              of them. */}
          <Reveal className="lg:col-span-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={asset(photos.auscepCohort.src)}
                alt={photos.auscepCohort.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
