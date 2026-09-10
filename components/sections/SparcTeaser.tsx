import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { sparc } from "@/lib/content";

/** The three facts a clinician or a health service needs before clicking. Full
 *  detail lives on /programs#sparc; the home page only has to make the case
 *  that something new is coming. */
const facts = [
  { value: "3", label: "Month program" },
  { value: "8", label: "Workshops" },
  { value: "20", label: "Clinicians per cohort" },
];

/**
 * Home page teaser for Clinician+, the live program. Sits before the AUSCEP block so
 * the page reads forwards: here is what is next, and here is the track record
 * behind it.
 */
export function SparcTeaser() {
  return (
    <section id="sparc" className="section relative bg-surface-subtle">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{sparc.eyebrow}</span>
              <span className="chip">{sparc.status}</span>
            </div>

            {/* Compact lockup here, so "Innovation Program" stays as a real
                heading: text is indexed and read aloud, artwork is neither. */}
            <img
              src={asset("/brand/clinicianplus-horizontal-compact-navy.svg")}
              alt="ASME Clinician+"
              width={7444}
              height={750}
              className="mt-5 w-[280px] max-w-full md:w-[330px]"
            />

            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              {sparc.subtitle}
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-fg balance">
              {sparc.hook}
            </p>
            <p className="mt-5 text-base leading-relaxed text-fg-muted pretty">
              {sparc.description}
            </p>
            <p className="mt-5 text-sm font-medium text-brand-blue">
              {sparc.foundationPartners}
            </p>

            <Link
              href="/programs#sparc"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-deep"
            >
              Explore the Clinician+ program
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-6">
            <dl className="grid grid-cols-3 gap-4">
              {facts.map((f) => (
                <div key={f.label} className="card p-6 text-center">
                  <dt className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                    {f.value}
                  </dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {sparc.details.slice(2).map((d) => (
                <li key={d.title} className="card p-5">
                  <p className="font-medium text-fg">{d.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted pretty">
                    {d.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
