import Image from "next/image";
import {
  Clock,
  BookOpen,
  Users,
  Network,
  Target,
  Award,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { photos, sparc, site } from "@/lib/content";
import { asset } from "@/lib/asset";

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  book: BookOpen,
  users: Users,
  network: Network,
  target: Target,
  award: Award,
};

/**
 * SPARC is sold to health services, not to individuals, so this section leads
 * with what the program is, then makes the organisational case, then offers
 * both doors: an institutional enquiry and free ASME membership for clinicians
 * who want to be told when dates land.
 */
export function Sparc() {
  return (
    <section id="sparc" className="section relative">
      <Container>
        <Reveal className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{sparc.eyebrow}</span>
            <span className="chip">{sparc.status}</span>
          </div>
          <div className="mt-5">
            <Image
              src={asset("/sparc-logo.png")}
              alt="SPARC"
              width={329}
              height={96}
              className="h-14 w-auto md:h-16"
            />
          </div>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            <span className="sr-only">SPARC </span>
            {sparc.subtitle}
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-fg balance md:text-2xl">
            {sparc.hook}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            {sparc.description}
          </p>
          <p className="mt-5 text-sm font-medium text-brand-blue">
            {sparc.foundationPartners}
          </p>
        </Reveal>

        {/* What the program actually is */}
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {sparc.details.map((d, i) => {
            const Icon = iconMap[d.glyph];
            return (
              <Reveal key={d.title} delay={i * 0.04}>
                <article className="group h-full">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--accent-light))]/10 text-[rgb(var(--accent))] transition-colors duration-200 group-hover:bg-[rgb(var(--accent))] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl tracking-tight text-fg">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted pretty">
                    {d.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* SPARC is described as "born from the ARC Global Innovation Centre and
            delivered across centres around the world". This is that. */}
        <Reveal className="mt-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={asset(photos.sparcLaunch.src)}
              alt={photos.sparcLaunch.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* The institutional case */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">For health services</span>
            <h3 className="h-display mt-3 text-3xl tracking-tight balance md:text-4xl">
              Why bring SPARC to your organisation.
            </h3>
            <p className="mt-5 text-base leading-relaxed text-fg-muted pretty">
              SPARC runs inside your organisation, focused on the challenges you
              choose, for a cohort of up to 20 of your clinicians.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={`mailto:${site.email}?subject=SPARC%20enquiry`}
                size="md"
              >
                Enquire about SPARC
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7">
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {sparc.benefitTitles.map((title, i) => (
                <li key={title} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-blue" />
                  <div>
                    <p className="font-medium text-fg">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted pretty">
                      {sparc.benefits[i]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
